import { Router } from "express";
import RoleController from "../controllers/role.controller";

const roleRouter = Router();
const roleController = new RoleController();

roleRouter.post("/createRole", roleController.createRole);

roleRouter.get("/getRoles", roleController.getRoles);

export default roleRouter;
