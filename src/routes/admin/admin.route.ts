import { NextFunction, Request, Response, Router } from "express";
import AdminUserManageController from "../../controllers/admin/admin.users.controller";
import AdminSellerManageController from "../../controllers/admin/admin.seller.controller";
import AdminRoleManageController from "../../controllers/admin/admin.role.controller";
import AdminPermissionManageController from "../../controllers/admin/admin.permission.controller";
import AdminContactManageController from "../../controllers/admin/admin.contact.controller";
import AdminLandingPageManageController from "../../controllers/admin/admin.landingPage.controller";
import { upload } from "../../middlewares/upload.middleware";

const adminRouter = Router();
const adminUserController = new AdminUserManageController();
const adminSellerController = new AdminSellerManageController();
const adminRoleController = new AdminRoleManageController();
const adminPermissionController = new AdminPermissionManageController();
const adminContactController = new AdminContactManageController();
const adminLandingPageController = new AdminLandingPageManageController();

adminRouter.get("/getAllUsers", adminUserController.getAllUsers);

adminRouter.get("/getUsersByStatus", adminUserController.getUsersByStatus);

adminRouter.patch("/modifyUser", adminUserController.modifyUser);

adminRouter.delete("/deleteUser/:id", adminUserController.deleteUser);

adminRouter.get("/getDeletedUser", adminUserController.getDeletedUsers);

adminRouter.get("/getVerifiedSeller", adminSellerController.getVerifiedSeller);

adminRouter.get("/getPendingSeller", adminSellerController.getPendingSeller);

adminRouter.patch(
  "/changeSellerStatus/approvedSeller",
  (req: Request, res: Response, next: NextFunction) => {
    req.body.is_verified = true;
    next();
  },
  adminSellerController.changeSellerStatus
);

adminRouter.patch(
  "/changeSellerStatus/rejectSeller",
  (req: Request, res: Response, next: NextFunction) => {
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

adminRouter.post(
  "/landingpage/crousel/addImage",
  upload.single("imageUrl"),
  adminLandingPageController.addCrousel
);

adminRouter.get(
  "/landingpage/crousel/getImages",
  adminLandingPageController.getCrousel
);

adminRouter.post("/contact/addContact", adminContactController.addContact);

adminRouter.get(
  "/contact/getSpecificContact",
  adminContactController.getContact
);

adminRouter.get("/contact/getAllContact", adminContactController.getAll);

adminRouter.patch(
  "/contact/updateContact",
  adminContactController.updateContact
);

adminRouter.delete(
  "/contact/deleteContact",
  adminContactController.deleteContact
);
export default adminRouter;
