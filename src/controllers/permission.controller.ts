import { NextFunction, Request, Response } from "express";
import ApplicationError from "../error/ApplicationError";
import Responses from "../modules/responses";
import PermissionService from "../services/permission.service";

const permissionService = new PermissionService();
export default class PermissionController {
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
      await permissionService.create({ permission });
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
      const permissions = await permissionService.get();
      Responses.generateSuccessResponse(res, 200, { permissions });
    } catch (error) {
      next(error);
    }
  }
}
