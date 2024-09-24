import { Request, Response, NextFunction } from "express";
import ApplicationError from "../error/ApplicationError";
import OtpService from "../services/otp.service";
import sendMail from "../utils/mail.sent";
import { OTP } from "../types/otp.types";
import { AppDataSource } from "../db/data-source";
import { User } from "../entity/user.entity";
import UserService from "../services/users.service";
import AuthTokens from "../utils/tokens";

let generatedOtp: OTP | null = null;
const userService = new UserService();

export default class UserController {
  async sendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      if (!email) {
        throw new ApplicationError(400, "Email is Required !!");
      }
      const data = await OtpService.getOtp(email);
      generatedOtp = { ...data };
      sendMail(email, data.otp);
      return res.status(200).json({
        succes: true,
        data: {
          id: data.id,
          created_at: data.created_at,
        },
        message: "Otp Sent Successfully !!",
      });
    } catch (error) {
      next(error);
    }
  }
  async validateOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, otp, email } = req.body;
      if (!id || !otp || !email) {
        throw new ApplicationError(400, "Enter Require fields");
      }
      // await OtpService.validateOtp({ email, id, otp });
      if (generatedOtp?.id !== id && generatedOtp?.email !== email) {
        throw new ApplicationError(400, "Please Generate Otp");
      }

      const currTime = new Date();
      const otpGenTime = generatedOtp?.created_at;
      if (currTime.getTime() - (otpGenTime?.getTime() as number) > 120000) {
        throw new ApplicationError(400, "OTP Expired");
      }

      if (generatedOtp?.otp != otp) {
        throw new ApplicationError(401, "Invalid OTP");
      }
      const user = await userService.saveUser({
        email: generatedOtp?.email as string,
      });
      const { accessToken, refreshToken } =
        AuthTokens.generateAccessAndRefreshToken(user.id);
      return res
        .status(201)
        .json({ success: true, accessToken, refreshToken, auth: true });
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req: Request, res: Response, next: NextFunction) {}
}
