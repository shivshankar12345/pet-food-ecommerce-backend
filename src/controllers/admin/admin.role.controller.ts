import { NextFunction, Request, Response } from "express";
import ApplicationError from "../../error/ApplicationError";
import Responses from "../../modules/responses";
import { AppDataSource } from "../../db/data-source";
import { Permission } from "../../entity/permission.entity";
import { Role } from "../../entity/role.entity";
import AdminRoleManageService from "../../services/admin/admin.role.service";

const adminRoleService = new AdminRoleManageService();
export default class AdminRoleManageController {
  async createRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { role_name, permission } = req.body;
      if (!role_name || !permission) {
        throw new ApplicationError(400, "Please Provide All fields");
      }
      await adminRoleService.create({ role_name, permission });
      Responses.generateSuccessResponse(res, 201, {
        message: "Role Added",
      });
    } catch (error) {
      next(error);
    }
  }

  async getRoles(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const roles = await adminRoleService.get();
      Responses.generateSuccessResponse(res, 200, { roles });
    } catch (error) {
      next(error);
    }
  }
}
