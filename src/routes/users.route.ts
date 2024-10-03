import { NextFunction, Request, Response, Router } from "express";
import UserController from "../controllers/users.controller";
import jwtAuth from "../middlewares/jwtAuth";
import validateRefreshToken from "../middlewares/auth";
import AuthTokens from "../utils/tokens";
import Responses from "../modules/responses";

const userRouter = Router();
const userController: UserController = new UserController();

userRouter.post("/sendOtp", userController.sendOtp);

userRouter.post("/validateOtp", userController.validateOtp);

userRouter.patch("/update", jwtAuth, userController.updateUser);

userRouter.patch(
  "/createSellerRequest",
  jwtAuth,
  userController.createSellerReq
);
userRouter.post(
  "/refreshToken",
  validateRefreshToken,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken } = AuthTokens.generateAccessToken((req as any).user);
      return Responses.generateSuccessResponse(res, 200, { accessToken });
    } catch (error) {
      next(error);
    }
  }
);

export default userRouter;
