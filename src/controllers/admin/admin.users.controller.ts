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
      const data = await adminUserService.getUsers(true);
      return Responses.generateSuccessResponse(res, 200, { users: data });
    } catch (error) {
      next(error);
    }
  }

  async getInActiveUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await adminUserService.getUsers(false);
      return Responses.generateSuccessResponse(res, 200, { users: data });
    } catch (error) {
      next(error);
    }
  }
}
