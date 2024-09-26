import ApplicationError from "../error/ApplicationError";
import {
  AccessAndRefreshTokenData,
  AccessTokenData,
  RefreshTokenData,
} from "../types/token.types";
import jwt, { JwtPayload } from "jsonwebtoken";

export default class AuthTokens {
  //* Generation of Tokens
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

  //* Generate Both Token using a Single function
  static generateAccessAndRefreshToken(id: string): AccessAndRefreshTokenData {
    const { accessToken } = this.generateAccessToken(id);
    const { refreshToken } = this.generateRefreshToken(id);
    return { accessToken, refreshToken };
  }

  //* Verification of Tokens
  static verifyAccessToken(token: string): JwtPayload | string {
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

  static verifyRefreshToken(token: string): JwtPayload | string {
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
}
