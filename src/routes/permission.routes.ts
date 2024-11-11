import { Router } from "express";
import PermissionController from "../controllers/permission.controller";

const permissionRouter = Router();
const permissionController = new PermissionController();

permissionRouter.get("/getPermissions", permissionController.getPermissions);
permissionRouter.post(
  "/createPermission",
  permissionController.createPermission
);

export default permissionRouter;
