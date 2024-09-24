import { Router } from "express";
import UserController from "../controllers/users.controller";

const userRouter = Router();
const userController: UserController = new UserController();

userRouter.post("/sendOtp", userController.sendOtp);

userRouter.post("/validateOtp", userController.validateOtp);

userRouter.patch("/update", userController.validateOtp);

export default userRouter;
