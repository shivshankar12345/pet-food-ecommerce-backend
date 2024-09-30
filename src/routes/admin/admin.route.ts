import { NextFunction, Request, Response, Router } from "express";
import ApplicationError from "../../error/ApplicationError";
import { AppDataSource } from "../../db/data-source";
import { Permission } from "../../entity/permission.entity";
import Responses from "../../modules/responses";
import { Role } from "../../entity/role.entity";

const adminRouter = Router();

adminRouter.get(
  "/getUserDetails",
  (req: Request, res: Response, next: NextFunction) => {}
);

adminRouter.get(
  "/getSellerDetails",
  (req: Request, res: Response, next: NextFunction) => {}
);

adminRouter.get(
  "/getPendingSeller",
  (req: Request, res: Response, next: NextFunction) => {}
);

adminRouter.patch(
  "/changeSellerStatus",
  (req: Request, res: Response, next: NextFunction) => {}
);

adminRouter.post(
  "/createRole",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role_name, permission } = req.body;
      if (!role_name || !permission) {
        throw new ApplicationError(400, "Please Provide All fields");
      }

      const permissionRepository = AppDataSource.getRepository(Permission);
      const roleRepository = AppDataSource.getRepository(Role);

      const permissions = await permissionRepository.findOne({
        where: { permission },
      });
      if (!permissions) {
        throw new ApplicationError(400, "Invalid Permission");
      }
      await roleRepository.save({
        role_name,
        permission: permissions,
      });
      return Responses.generateSuccessResponse(res, 201, {
        message: "Role Added",
      });
    } catch (error) {
      next(error);
    }
  }
);

adminRouter.post(
  "/createPermission",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const permissionRepository = AppDataSource.getRepository(Permission);
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
      await permissionRepository.save({ permission });
      return Responses.generateSuccessResponse(res, 201, {
        message: "Permission Added",
      });
    } catch (error) {
      next(error);
    }
  }
);

adminRouter.get(
  "/getPermissions",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const permissionRepository = AppDataSource.getRepository(Permission);
      const data = await permissionRepository.find();
      return Responses.generateSuccessResponse(res, 200, {
        success: true,
        permissions: [...data],
      });
    } catch (error) {
      next(error);
    }
  }
);
export default adminRouter;
