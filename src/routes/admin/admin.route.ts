import { NextFunction, Request, Response, Router } from "express";
import ApplicationError from "../../error/ApplicationError";
import { AppDataSource } from "../../db/data-source";
import { Permission } from "../../entity/permission.entity";
import Responses from "../../modules/responses";
import { Role } from "../../entity/role.entity";
import AdminUserManageController from "../../controllers/admin/admin.users.controller";
import AdminSellerManageController from "../../controllers/admin/admin.seller.controller";
import AdminRoleManageController from "../../controllers/admin/admin.role.controller";
import AdminPermissionManageController from "../../controllers/admin/admin.permission.controller";

const adminRouter = Router();
const adminUserController = new AdminUserManageController();
const adminSellerController = new AdminSellerManageController();
const adminRoleController = new AdminRoleManageController();
const adminPermissionController = new AdminPermissionManageController();

adminRouter.get("/getActiveUsers", adminUserController.getActiveUsers);

adminRouter.get("/getAllUsers", adminUserController.getAllUsers);

adminRouter.get("/getInactiveUsers", adminUserController.getInActiveUsers);

adminRouter.patch("/modifyUser", adminUserController.modifyUser);

adminRouter.get("/getVerifiedSeller", adminSellerController.getVerifiedSeller);

adminRouter.get("/getPendingSeller", adminSellerController.getPendingSeller);

adminRouter.patch(
  "/changeSellerStatus/approvedSeller",
  (req, res, next) => {
    req.body.is_verfied = true;
    next();
  },
  adminSellerController.changeSellerStatus
);

adminRouter.patch(
  "/changeSellerStatus/rejectSeller",
  (req, res, next) => {
    req.body.is_verfied = false;
    next();
  },
  adminSellerController.changeSellerStatus
);

adminRouter.post("/createRole", adminRoleController.createRole);

adminRouter.get("/getRoles", adminRoleController.getRoles);

adminRouter.post(
  "/createPermission",
  adminPermissionController.createPermission
);

adminRouter.get("/getPermissions", adminPermissionController.getPermissions);
export default adminRouter;
