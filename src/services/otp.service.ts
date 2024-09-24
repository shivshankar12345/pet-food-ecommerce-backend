import { AppDataSource } from "../db/data-source";
import { OTP, ValidateOtpArgs } from "../types/otp.types";
import { generateOtp } from "../utils/otp";
import { Otp } from "../entity/otp.entity";
import ApplicationError from "../error/ApplicationError";
import { v4 as uuid4 } from "uuid";

const otpRepository = AppDataSource.getRepository(Otp);

export default class OtpService {
  static async getOtp(email: string) {
    const otp: string = generateOtp();
    const data: OTP = {
      id: uuid4(),
      email,
      otp,
      created_at: new Date(),
    };
    // const data = new Otp();
    // data.email = email;
    // data.otp = otp;
    // const sentOtp = await otpRepository.save(data);
    // return sentOtp;
    return data;
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
      if (currentTime.getTime() - otpGenerateTime.getTime() > 120000) {
        throw new ApplicationError(101, "");
      }
      if (values.otp != otpDoc.otp) {
        throw new ApplicationError(400, "Incorrect Otp");
      }
    } catch (error) {
      throw error;
    }
  }
}
