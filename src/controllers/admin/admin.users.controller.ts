import { NextFunction, Request, Response } from "express";
import AdminUserManageService from "../../services/admin/admin.users.service";
import Responses from "../../modules/responses";
import ApplicationError from "../../error/ApplicationError";

const adminUserService = new AdminUserManageService();

export default class AdminUserManageController {
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
      await adminUserService.updateUserData(data_to_update, id);
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
      const data = await adminUserService.getUsers(
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
      const data = await adminUserService.getAllUsers(
        limitOfDocs,
        skipElements,
        search as string
      );

      const total_pages =
        Math.trunc(data.total_users / limitOfDocs) ==
        data.total_users / limitOfDocs
          ? data.total_users / limitOfDocs
          : Math.trunc(data.total_users / limitOfDocs) + 1;
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

      await adminUserService.updateUserData(
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
      const data = await adminUserService.getDeletedUsers(
        limitOfDocs,
        skipElements,
        search as string
      );

      const total_pages =
        Math.trunc(data.total_users / limitOfDocs) ==
        data.total_users / limitOfDocs
          ? data.total_users / limitOfDocs
          : Math.trunc(data.total_users / limitOfDocs) + 1;
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
