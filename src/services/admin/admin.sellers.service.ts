import { IsNull, Not } from "typeorm";
import { AppDataSource } from "../../db/data-source";
import { User } from "../../entity/user.entity";
import ApplicationError from "../../error/ApplicationError";

const userRepository = AppDataSource.getRepository(User);

export default class AdminSellerManageService {
  async getActive() {
    try {
      const activeSellers = await userRepository.find({
        where: { is_verfied: true },
        select: [
          "id",
          "name",
          "email",
          "phone",
          "gender",
          "gst_num",
          "pan_num",
          "is_active",
        ],
      });
      return activeSellers;
    } catch (error) {
      throw error;
    }
  }
  async getPending() {
    try {
      const pendingSellers = await userRepository.find({
        where: [
          { is_verfied: false, gst_num: Not(IsNull()) },
          { is_verfied: false, pan_num: Not(IsNull()) },
        ],
        select: [
          "id",
          "name",
          "email",
          "phone",
          "gender",
          "gst_num",
          "pan_num",
          "is_active",
        ],
      });
      return pendingSellers;
    } catch (error) {
      throw error;
    }
  }

  async updateSeller({
    id,
    is_verified,
  }: {
    id: string;
    is_verified: boolean;
  }) {
    try {
      const userExist = await userRepository.findOne({ where: { id } });
      if (!userExist) {
        throw new ApplicationError(404, "User not found");
      }

      if (!userExist.pan_num || !userExist.gst_num) {
        throw new ApplicationError(400, "User need to Create Request first");
      }
      userExist.is_verfied = is_verified;
      if (!is_verified) {
        userExist.gst_num = null as any;
        userExist.pan_num = null as any;
      }
      await userRepository.save(userExist);
    } catch (error) {
      throw error;
    }
  }
}
