import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ApplicationError from "../error/ApplicationError";
import AuthTokens from "../utils/tokens";

function jwtAuth(req: Request, res: Response, next: NextFunction): any {
  try {
    const authToken: string | null =
      (req.body as any)?.authToken ||
      (req.headers as any)?.authorization ||
      (req.query as any)?.authToken;
    if (!authToken) {
      throw new ApplicationError(401, "UnAuthorized Access");
    }
    const token = authToken.split(" ")[1];
    if (!token) {
      throw new ApplicationError(400, "Token not found");
    }
    const payload = AuthTokens.verifyAccessToken(token);
    (req as any).id = (payload as any).id;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(403)
        .json({ success: false, message: "Token Expired", tokenExpired: true });
    }
    res.status(401).json({ success: false, message: "UnAuthorizedAccess" });
  }
}

export default jwtAuth;
