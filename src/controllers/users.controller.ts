import { Request, Response, NextFunction } from "express";
import ApplicationError from "../error/ApplicationError";
import sendMail from "../utils/nodemailer";
import { OTP } from "../types/otp.types";
import UserService from "../services/users.service";
import AuthTokens from "../utils/tokens";
import { UpdateUser } from "../types/user.types";
import { v4 as uuidv4 } from "uuid";
import { generateOtp } from "../utils/otp";
import Responses from "../modules/responses";
import { AppDataSource } from "../db/data-source";
import { User } from "../entity/user.entity";

let generatedOtp: OTP | null = null;
const userService = new UserService();

export default class UserController {
  async sendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Inside");
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
      sendMail(email, data.otp);
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

      const user = await userService.saveUser({
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
      const data_to_update: UpdateUser = { id };
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
      await userService.updateUser({ pan_num, gst_num, id });
      Responses.generateSuccessResponse(res, 200, {
        message: "Seller Request Created Successfully ",
      });
    } catch (error) {
      next(error);
    }
  }
}
