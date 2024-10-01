import { NextFunction, Request, Response } from "express";
import AdminUserManageService from "../../services/admin/admin.users.service";
import Responses from "../../modules/responses";

const adminUserService = new AdminUserManageService();
export default class AdminUserManageController {
  async changeUserActivationStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {}

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
