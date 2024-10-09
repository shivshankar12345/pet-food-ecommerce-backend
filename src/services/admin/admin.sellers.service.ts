import { IsNull, Not } from "typeorm";
import { AppDataSource } from "../../db/data-source";
import { User } from "../../entity/user.entity";
import ApplicationError from "../../error/ApplicationError";
import { Role } from "../../entity/role.entity";

const userRepository = AppDataSource.getRepository(User);
const roleRepository = AppDataSource.getRepository(Role);

export default class AdminSellerManageService {
  async getVerified(skip: number, take: number, search: string) {
    try {
      const verified_sellers = await userRepository.find({
        where: { is_verified: true },
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
        skip,
        take,
      });
      const total_verified_sellers = await userRepository.count({
        where: { is_verified: true },
      });
      return { verified_sellers, total_verified_sellers };
    } catch (error) {
      throw error;
    }
  }
  async getPending(skip: number, take: number, search: string) {
    try {
      const pending_sellers = await userRepository.find({
        where: [
          { is_verified: false, gst_num: Not(IsNull()) },
          { is_verified: false, pan_num: Not(IsNull()) },
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
        skip,
        take,
      });
      const total_pending_sellers = await userRepository.count({
        where: [
          { is_verified: false, gst_num: Not(IsNull()) },
          { is_verified: false, pan_num: Not(IsNull()) },
        ],
      });
      return { pending_sellers, total_pending_sellers };
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
      userExist.is_verified = is_verified;
      if (!is_verified) {
        userExist.gst_num = null as any;
        userExist.pan_num = null as any;
      } else {
        const role = await roleRepository.findOne({
          where: { role_name: "seller" },
        });
        if (!role) {
          throw new ApplicationError(500, "Something went wrong ");
        }
        userExist.role = role as Role;
      }
      await userRepository.save(userExist);
    } catch (error) {
      throw error;
    }
  }
}
