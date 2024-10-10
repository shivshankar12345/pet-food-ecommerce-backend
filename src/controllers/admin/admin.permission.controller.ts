import { NextFunction, Request, Response } from "express";
import Responses from "../../modules/responses";
import ApplicationError from "../../error/ApplicationError";
import AdminPermissionManageService from "../../services/admin/admin.permission.service";

const adminPermissionService = new AdminPermissionManageService();
export default class AdminPermissionManageController {
  async createPermission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { permission } = req.body;
      if (!permission) {
        throw new ApplicationError(400, "Enter Permission name");
      }
      if (
        permission != "limited" &&
        permission != "moderate" &&
        permission != "full"
      ) {
        throw new ApplicationError(400, "Invalid Permission");
      }
      await adminPermissionService.create({ permission });
      Responses.generateSuccessResponse(res, 201, {
        message: "Permission Added",
      });
    } catch (error) {
      next(error);
    }
  }

  async getPermissions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const permissions = await adminPermissionService.get();
      Responses.generateSuccessResponse(res, 200, { permissions });
    } catch (error) {
      next(error);
    }
  }
}
