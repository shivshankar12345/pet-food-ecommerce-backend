import { NextFunction, Request, Response } from "express";
import ApplicationError from "../error/ApplicationError";
import Responses from "../modules/responses";
import RoleService from "../services/role.service";

const roleService = new RoleService();
export default class RoleController {
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
      await roleService.create({ role_name, permission });
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
      const roles = await roleService.get();
      Responses.generateSuccessResponse(res, 200, { roles });
    } catch (error) {
      next(error);
    }
  }
}
