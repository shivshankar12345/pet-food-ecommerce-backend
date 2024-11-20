import { Router } from "express";
import UserController from "../controllers/users.controller";
import jwtAuth from "../middlewares/jwtAuth";
import validateRefreshToken from "../middlewares/refreshToken.auth";
import customerAuth from "../middlewares/customer.auth";
import validateAdmin from "../middlewares/admin.auth";

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

userRouter.get(
  "/getAllUsers",
  jwtAuth,
  validateAdmin,
  userController.getAllUsers
);

userRouter.get(
  "/getUsersByStatus",
  jwtAuth,
  validateAdmin,
  userController.getUsersByStatus
);

userRouter.patch(
  "/modifyUser",
  jwtAuth,
  validateAdmin,
  userController.modifyUser
);

userRouter.delete(
  "/deleteUser/:id",
  jwtAuth,
  validateAdmin,
  userController.deleteUser
);

userRouter.get(
  "/getDeletedUser",
  jwtAuth,
  validateAdmin,
  userController.getDeletedUsers
);

export default userRouter;
