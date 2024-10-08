import { NextFunction, Request, Response } from "express";
import AdminUserManageService from "../../services/admin/admin.users.service";
import Responses from "../../modules/responses";
import ApplicationError from "../../error/ApplicationError";

const adminUserService = new AdminUserManageService();

export default class AdminUserManageController {
  async modifyUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { is_active = null, id = null } = req.body;
      if (is_active == null || id == null) {
        throw new ApplicationError(400, "Provide Required fields");
      }

      await adminUserService.updateUserData({ is_active }, id);
      return Responses.generateSuccessResponse(res, 200, {
        message: "User Updated Successfully !!",
      });
    } catch (error) {
      next(error);
    }
  }

  async getActiveUsers(req: Request, res: Response, next: NextFunction) {
    try {
      let { limit, page_num, search = "" } = req.query;
      const limitOfDocs = limit ? parseInt(limit as string) : 10;
      const skipElements =
        (page_num ? parseInt(page_num as string) - 1 : 0) * limitOfDocs;
      const data = await adminUserService.getUsers(
        true,
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

  async getInActiveUsers(req: Request, res: Response, next: NextFunction) {
    try {
      let { limit, page_num, search = "" } = req.query;
      const limitOfDocs = limit ? parseInt(limit as string) : 10;
      const skipElements =
        (page_num ? parseInt(page_num as string) - 1 : 0) * limitOfDocs;
      const data = await adminUserService.getUsers(
        false,
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
}
