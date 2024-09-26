import { Router } from "express";
import UserController from "../controllers/users.controller";
import jwtAuth from "../middleware/jwtAuth";

const userRouter = Router();
const userController: UserController = new UserController();

userRouter.post("/sendOtp", userController.sendOtp);

userRouter.post("/validateOtp", userController.validateOtp);

userRouter.patch("/update", jwtAuth, userController.updateUser);

export default userRouter;
