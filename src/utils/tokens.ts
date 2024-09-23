import ApplicationError from "../error/ApplicationError";
import {
  AccessAndRefreshTokenData,
  AccessTokenData,
  RefreshTokenData,
  VerifyTokenPayload,
} from "../types/token.types";
import jwt, { JwtPayload } from "jsonwebtoken";

export default class AuthTokens {
  static generateAccessToken(id: string): AccessTokenData {
    const accessToken = jwt.sign(
      { id },
      process.env.ACCESS_TOKEN_SECRET_KEY as string,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string }
    );
    return { accessToken };
  }

  static generateRefreshToken(id: string): RefreshTokenData {
    const refreshToken = jwt.sign(
      { id },
      process.env.REFRESH_TOKEN_SECRET_KEY as string,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
    return { refreshToken };
  }

  static verifyAccessToken(token: string): JwtPayload | string | void {
    try {
      const payload = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET_KEY as string
      );
      return payload;
    } catch (error) {
      throw new ApplicationError(401, "UnAuthorizedAccess");
    }
  }

  static verifyRefreshToken(token: string): JwtPayload | string | void {
    try {
      const payload = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET_KEY as string
      );
      return payload;
    } catch (error) {
      throw new ApplicationError(401, "UnAuthorizedAccess");
    }
  }

  static generateAccessAndRefreshToken(id: string): AccessAndRefreshTokenData {
    const { accessToken } = this.generateAccessToken(id);
    const { refreshToken } = this.generateRefreshToken(id);
    return { accessToken, refreshToken };
  }
}
