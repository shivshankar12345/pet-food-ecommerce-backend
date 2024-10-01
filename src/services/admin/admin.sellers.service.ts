import { Not } from "typeorm";
import { AppDataSource } from "../../db/data-source";
import { User } from "../../entity/user.entity";

const userRepository = AppDataSource.getRepository(User);

export default class AdminSellerManageService {
  async getActive() {
    try {
      const activeSellers = await userRepository.find({
        where: { is_verfied: true },
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
          { is_verfied: false, gst_num: Not(null as unknown as string) },
          { is_verfied: false, pan_num: Not(null as unknown as string) },
        ],
      });
      return pendingSellers;
    } catch (error) {
      throw error;
    }
  }
  approveSellerRequest() {}
  rejectSellerRequest() {}
}
