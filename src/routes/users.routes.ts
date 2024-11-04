import { Router } from "express";
import UserController from "../controllers/users.controller";
import jwtAuth from "../middlewares/jwtAuth";
import validateRefreshToken from "../middlewares/refreshToken.auth";
import customerAuth from "../middlewares/customer.auth";

const userRouter = Router();
const userController: UserController = new UserController();

userRouter.post("/sendOtp", userController.sendOtp);

userRouter.post("/validateOtp", userController.validateOtp);

userRouter.patch("/update", jwtAuth, userController.updateUser);

userRouter.patch(
  "/createSellerRequest",
  jwtAuth,
  customerAuth,
  userController.createSellerReq
);

userRouter.post(
  "/refreshToken",
  validateRefreshToken,
  userController.refreshToken
);

userRouter.get("/getUser", jwtAuth, userController.getUserInformation);

userRouter.get("/getAllUsers", userController.getAllUsers);

userRouter.get("/getUsersByStatus", userController.getUsersByStatus);

userRouter.patch("/modifyUser", userController.modifyUser);

userRouter.delete("/deleteUser/:id", userController.deleteUser);

userRouter.get("/getDeletedUser", userController.getDeletedUsers);

export default userRouter;
