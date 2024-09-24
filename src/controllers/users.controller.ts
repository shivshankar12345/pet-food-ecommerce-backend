import { Request, Response, NextFunction } from "express";
import ApplicationError from "../error/ApplicationError";
import OtpService from "../services/otp.service";
import sendMail from "../utils/mail.sent";

export default class UserController {
  async sendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      if (!email) {
        throw new ApplicationError(400, "Email is Required !!");
      }
      const data = await OtpService.sendOtp(email);
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
      await OtpService.validateOtp({ email, id, otp });
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req: Request, res: Response, next: NextFunction) {}
}
