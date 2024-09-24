import { AppDataSource } from "../db/data-source";
import { ValidateOtpArgs } from "../types/otp.types";
import { generateOtp } from "../utils/otp";
import { Otp } from "../entity/otp.entity";
import ApplicationError from "../error/ApplicationError";

const otpRepository = AppDataSource.getRepository(Otp);

export default class OtpService {
  static async sendOtp(email: string) {
    const otp: string = generateOtp();
    const data = new Otp();
    data.email = email;
    data.otp = otp;
    const sentOtp = await otpRepository.save(data);
    return sentOtp;
  }

  static async validateOtp(values: ValidateOtpArgs) {
    try {
      const otpDoc = await otpRepository.findOne({
        where: { id: values.id, email: values.email },
      });
      if (!otpDoc) {
        throw new ApplicationError(400, "Please Re-Generate OTP");
      }
      const currentTime = new Date();
      const otpGenerateTime = new Date(otpDoc.created_at);
      if (currentTime - otpGenerateTime > 120000) {
      }
      if (values.otp != otpDoc.otp) {
        throw new ApplicationError(400, "Incorrect Otp");
      }
    } catch (error) {
      throw error;
    }
  }
}
