import { Request, Response, NextFunction } from "express";
import ApplicationError from "../error/ApplicationError";
import sendMail from "../utils/nodemailer";
import { OTP } from "../types/otp.types";
import UserService from "../services/users.service";
import AuthTokens from "../utils/tokens";
import { UserOptional, Id } from "../types/user.types";
import { v4 as uuidv4 } from "uuid";
import { generateOtp } from "../utils/otp";
import Responses from "../modules/responses";
import { AppDataSource } from "../db/data-source";
import { User } from "../entity/user.entity";
import { getOtpHtml, userSellerRequest } from "../modules/html";

let generatedOtp: OTP | null = null;
const userService = new UserService();

export default class UserController {
  async sendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      if (!email) {
        throw new ApplicationError(400, "Email is Required !!");
      }
      const data: OTP = {
        email,
        id: uuidv4(),
        created_at: new Date(),
        otp: generateOtp(),
      };
      generatedOtp = { ...data };
      sendMail(
        email,
        "SuperTails - OTP Verification",
        "",
        getOtpHtml(data.otp)
      );
      return Responses.generateSuccessResponse(res, 200, {
        data: {
          id: data.id,
          created_at: data.created_at,
        },
        message: "Otp Sent Successfully !!",
      });
    } catch (error) {
      next(error);
    }
  }
  async validateOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, otp, email } = req.body;
      if (!id || !otp || !email) {
        throw new ApplicationError(400, "Enter Require fields");
      }
      if (generatedOtp?.id !== id || generatedOtp?.email !== email) {
        throw new ApplicationError(400, "Please Generate Otp");
      }
      const currTime = new Date();
      const otpGenTime = generatedOtp?.created_at;
      if (currTime.getTime() - (otpGenTime?.getTime() as number) > 120000) {
        throw new ApplicationError(400, "OTP Expired");
      }

      if (generatedOtp?.otp != otp) {
        throw new ApplicationError(401, "Invalid OTP");
      }

      const { user, newUser } = await userService.saveUser({
        email: generatedOtp?.email as string,
      });
      const { accessToken, refreshToken } =
        AuthTokens.generateAccessAndRefreshToken(user.id);
      generatedOtp = null;
      user.token = refreshToken;
      await AppDataSource.getRepository(User).save(user);
      return Responses.generateSuccessResponse(res, 201, {
        accessToken,
        refreshToken,
        auth: true,
        role: user.role.role_name,
        newUser,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name = null,
        phone = null,
        gender = null,
        email = null,
        pan_num = null,
        gst_num = null,
      } = req.body;
      const { id } = req as any;
      const data_to_update: UserOptional & Id = { id };
      if (name) {
        data_to_update.name = name;
      }
      if (phone) {
        data_to_update.phone = phone;
      }
      if (gender) {
        data_to_update.gender = gender;
      }
      if (email) {
        data_to_update.email = email;
      }
      if (pan_num) {
        data_to_update.pan_num = pan_num;
      }
      if (gst_num) {
        data_to_update.gst_num = gst_num;
      }

      if (!Object.keys(data_to_update).length) {
        throw new ApplicationError(
          400,
          "At Least One field is Required for Update"
        );
      }

      const updatedUser = await userService.updateUser(data_to_update);
      return Responses.generateSuccessResponse(res, 200, { user: updatedUser });
    } catch (error) {
      next(error);
    }
  }

  async createSellerReq(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { pan_num, gst_num } = req.body;
      const { id } = req as any;
      if (!pan_num || !gst_num) {
        throw new ApplicationError(400, "Please Enter Required fields");
      }
      const user = await userService.updateUser({ pan_num, gst_num, id });
      sendMail(
        user.email,
        "SuperTails - Seller Partnership Request Confirmation",
        "",
        userSellerRequest(user.name)
      );
      Responses.generateSuccessResponse(res, 200, {
        message: "Seller Request Created Successfully ",
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserInformation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req as any;
      if (!id) {
        throw new ApplicationError(401, "Please login first");
      }
      const user = await userService.getUser({ id });
      return Responses.generateSuccessResponse(res, 200, {
        user: {
          name: user?.name || "N/A",
          email: user?.email || "N/A",
          phone: user?.phone || "N/A",
          gender: user?.gender || "N/A",
          is_active: user?.is_active,
          sellerRequest:
            user?.role.role_name === "customer" && user.gst_num ? true : false,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = AuthTokens.generateAccessToken((req as any).user);
      return Responses.generateSuccessResponse(res, 200, { accessToken });
    } catch (error) {
      next(error);
    }
  }

  async modifyUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        is_active = null,
        id = null,
        name = null,
        email = null,
        phone = null,
        gender = null,
        pan_num = null,
        rating = null,
        gst_num = null,
      } = req.body;
      const data_to_update = {};
      if (id == null) {
        throw new ApplicationError(400, "Provide Required fields");
      }
      if (is_active != null) {
        Object.assign(data_to_update, { is_active });
      }
      if (name != null) {
        Object.assign(data_to_update, { name });
      }
      if (email != null) {
        Object.assign(data_to_update, { email });
      }
      if (gender != null) {
        if (gender != "m" && gender != "f" && gender != "o") {
          throw new ApplicationError(400, "Incorrect Gender Selection");
        }
        Object.assign(data_to_update, { gender });
      }
      if (phone != null) {
        Object.assign(data_to_update, { phone });
      }
      if (pan_num != null) {
        Object.assign(data_to_update, { pan_num });
      }
      if (rating != null) {
        Object.assign(data_to_update, { rating });
      }
      if (gst_num != null) {
        Object.assign(data_to_update, { gst_num });
      }
      if (!Object.keys(data_to_update).length) {
        throw new ApplicationError(
          400,
          "Atleast One field is Required to update"
        );
      }
      await userService.updateUserData(data_to_update, id);
      return Responses.generateSuccessResponse(res, 200, {
        message: "User Updated Successfully !!",
      });
    } catch (error) {
      next(error);
    }
  }

  async getUsersByStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const status: boolean | string =
        req.query.status === "true"
          ? true
          : req.query.status === "false"
            ? false
            : "";
      if (status === "") {
        throw new ApplicationError(400, "Invalid Parameters");
      }
      let { limit, page_num, search = "" } = req.query;
      const limitOfDocs = limit ? parseInt(limit as string) : 10;
      const skipElements =
        (page_num ? parseInt(page_num as string) - 1 : 0) * limitOfDocs;
      const data = await userService.getUsers(
        status as boolean,
        limitOfDocs,
        skipElements,
        search as string
      );
      const total_pages =
        (Math.trunc(data.total_users / limitOfDocs) ==
        data.total_users / limitOfDocs
          ? data.total_users / limitOfDocs
          : Math.trunc(data.total_users / limitOfDocs) + 1) || 1;
      return Responses.generateSuccessResponse(res, 200, {
        ...data,
        current_page: page_num ? parseInt(page_num as string) : 1,
        total_pages: total_pages,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      let { limit, page_num, search = "" } = req.query;
      const limitOfDocs = limit ? parseInt(limit as string) : 10;
      const skipElements =
        (page_num ? parseInt(page_num as string) - 1 : 0) * limitOfDocs;
      const data = await userService.getAllUsers(
        limitOfDocs,
        skipElements,
        search as string
      );

      const total_pages =
        (Math.trunc(data.total_users / limitOfDocs) ==
        data.total_users / limitOfDocs
          ? data.total_users / limitOfDocs
          : Math.trunc(data.total_users / limitOfDocs) + 1) || 1;
      return Responses.generateSuccessResponse(res, 200, {
        ...data,
        current_page: page_num ? parseInt(page_num as string) : 1,
        total_pages,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ApplicationError(400, "Id is Mendatory");
      }

      await userService.updateUserData(
        { deleted_at: new Date().toISOString() },
        id
      );
      return Responses.generateSuccessResponse(res, 200, {
        message: "User Deleted Successfully !!",
      });
    } catch (error) {
      next(error);
    }
  }

  async getDeletedUsers(req: Request, res: Response, next: NextFunction) {
    try {
      let { limit, page_num, search = "" } = req.query;
      const limitOfDocs = limit ? parseInt(limit as string) : 10;
      const skipElements =
        (page_num ? parseInt(page_num as string) - 1 : 0) * limitOfDocs;
      const data = await userService.getDeletedUsers(
        limitOfDocs,
        skipElements,
        search as string
      );

      const total_pages =
        (Math.trunc(data.total_users / limitOfDocs) ==
        data.total_users / limitOfDocs
          ? data.total_users / limitOfDocs
          : Math.trunc(data.total_users / limitOfDocs) + 1) || 1;
      return Responses.generateSuccessResponse(res, 200, {
        ...data,
        current_page: page_num ? parseInt(page_num as string) : 1,
        total_pages,
      });
    } catch (error) {
      next(error);
    }
  }
}
