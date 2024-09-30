import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AuthTokens from "../utils/tokens";
import { AppDataSource } from "../db/data-source";
import { Token } from "../entity/token.entity";
import ApplicationError from "../error/ApplicationError";

const validateRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    const tokenRepository = AppDataSource.getRepository(Token);
    const obj = await tokenRepository.findOne({
      where: { token: refreshToken },
    });
    if (!obj) {
      throw new ApplicationError(400, "Invalid Token");
    }
    const payload = AuthTokens.verifyRefreshToken(refreshToken);
    const { id } = payload as any;
    (req as any).user = id;
    next();
  } catch (error) {
    next(error);
  }
};

export default validateRefreshToken;
