import { Like } from "typeorm";
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
      const users = await userRepository.find({
        where: [
          { is_active: activationStatus, name: Like(`%${search}%`) },
          { is_active: activationStatus, email: Like(`%${search}%`) },
          { is_active: activationStatus, phone: Like(`%${search}%`) },
          { is_active: activationStatus, id: Like(`%${search}%`) },
        ],
        select: ["id", "name", "email", "phone", "is_active"],
        skip,
        take,
      });
      const total_users = await userRepository.count({
        where: [
          { is_active: activationStatus, name: Like(`%${search}%`) },
          { is_active: activationStatus, email: Like(`%${search}%`) },
          { is_active: activationStatus, phone: Like(`%${search}%`) },
          { is_active: activationStatus, id: Like(`%${search}%`) },
        ],
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
      const users = await userRepository.find({
        select: ["id", "name", "email", "phone", "is_active", "gender"],
        skip,
        take,
        where: [
          { id: Like(`%${search}%`) },
          { email: Like(`%${search}%`) },
          { name: Like(`%${search}%`) },
          { phone: Like(`%${search}%`) },
        ],
      });
      const total_users = await userRepository.count({
        where: [
          { id: Like(`%${search}%`) },
          { email: Like(`%${search}%`) },
          { name: Like(`%${search}%`) },
          { phone: Like(`%${search}%`) },
        ],
      });
      return { users, total_users };
    } catch (error) {
      throw error;
    }
  }
}
