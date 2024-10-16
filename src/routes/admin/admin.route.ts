import { NextFunction, Request, Response, Router } from "express";
import AdminUserManageController from "../../controllers/admin/admin.users.controller";
import AdminSellerManageController from "../../controllers/admin/admin.seller.controller";
import AdminRoleManageController from "../../controllers/admin/admin.role.controller";
import AdminPermissionManageController from "../../controllers/admin/admin.permission.controller";

const adminRouter = Router();
const adminUserController = new AdminUserManageController();
const adminSellerController = new AdminSellerManageController();
const adminRoleController = new AdminRoleManageController();
const adminPermissionController = new AdminPermissionManageController();

adminRouter.get("/getAllUsers", adminUserController.getAllUsers);

adminRouter.get("/getUsersByStatus", adminUserController.getUsersByStatus);

adminRouter.patch("/modifyUser", adminUserController.modifyUser);

adminRouter.delete("/deleteUser/:id", adminUserController.deleteUser);

adminRouter.get("/getDeletedUser", adminUserController.getDeletedUsers);

adminRouter.get("/getVerifiedSeller", adminSellerController.getVerifiedSeller);

adminRouter.get("/getPendingSeller", adminSellerController.getPendingSeller);

adminRouter.patch(
  "/changeSellerStatus/approvedSeller",
  (req, res, next) => {
    req.body.is_verified = true;
    next();
  },
  adminSellerController.changeSellerStatus
);

adminRouter.patch(
  "/changeSellerStatus/rejectSeller",
  (req, res, next) => {
    req.body.is_verified = false;
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
