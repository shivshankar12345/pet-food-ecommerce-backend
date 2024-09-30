import { NextFunction, Request, Response, Router } from "express";
import UserController from "../controllers/users.controller";
import jwtAuth from "../middleware/jwtAuth";
import validateRefreshToken from "../middlewares/auth";
import AuthTokens from "../utils/tokens";
import Responses from "../modules/responses";

const userRouter = Router();
const userController: UserController = new UserController();

userRouter.post("/sendOtp", userController.sendOtp);

userRouter.post("/validateOtp", userController.validateOtp);

userRouter.patch("/update", jwtAuth, userController.updateUser);

userRouter.post(
  "/refreshToken",
  validateRefreshToken,
  (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = AuthTokens.generateAccessToken((req as any).user);
    return Responses.generateSuccessResponse(res, 200, { accessToken });
  }
);

export default userRouter;
