import ApplicationError from "../../error/ApplicationError";
import { userRepository } from "../../repository/user.repository";

export default class AdminUserManageService {
  async getUsers(
    activationStatus: boolean,
    take: number,
    skip: number,
    search: string
  ) {
    try {
      const users = (
        await userRepository.find({
          where: { is_active: activationStatus },
          select: ["id", "name", "email", "phone", "is_active"],
          skip,
          take,
        })
      ).filter(
        value =>
          value.id.includes(search) ||
          value.email.includes(search) ||
          value.name.includes(search) ||
          value.phone.includes(search)
      );
      const total_users = await userRepository.count({
        where: { is_active: activationStatus },
      });
      return { users, total_users };
    } catch (error) {
      throw error;
    }
  }

  async updateUserData(data: any, id: string) {
    try {
      const user = await userRepository.findOne({ where: { id } });
      if (!user) {
        throw new ApplicationError(404, "user not found");
      }
      Object.assign(user, data);
      await userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(take: number, skip: number, search: string) {
    try {
      const users = (
        await userRepository.find({
          select: ["id", "name", "email", "phone", "is_active", "gender"],
          skip,
          take,
        })
      ).filter(
        value =>
          value.id.includes(search) ||
          value.email.includes(search) ||
          value.name.includes(search) ||
          value.phone.includes(search)
      );
      const total_users = await userRepository.count();
      return { users, total_users };
    } catch (error) {
      throw error;
    }
  }
}
