import { IsNull, Like, Not } from "typeorm";
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
          {
            is_active: activationStatus,
            name: Like(`%${search}%`),
            deleted_at: IsNull(),
          },
          {
            is_active: activationStatus,
            email: Like(`%${search}%`),
            deleted_at: IsNull(),
          },
          {
            is_active: activationStatus,
            phone: Like(`%${search}%`),
            deleted_at: IsNull(),
          },
          {
            is_active: activationStatus,
            id: Like(`%${search}%`),
            deleted_at: IsNull(),
          },
        ],
        select: ["id", "name", "email", "phone", "is_active", "gender"],
        skip,
        take,
      });
      const total_users = await userRepository.count({
        where: [
          {
            is_active: activationStatus,
            name: Like(`%${search}%`),
            deleted_at: IsNull(),
          },
          {
            is_active: activationStatus,
            email: Like(`%${search}%`),
            deleted_at: IsNull(),
          },
          {
            is_active: activationStatus,
            phone: Like(`%${search}%`),
            deleted_at: IsNull(),
          },
          {
            is_active: activationStatus,
            id: Like(`%${search}%`),
            deleted_at: IsNull(),
          },
        ],
      });
      return { users, total_users };
    } catch (error) {
      throw error;
    }
  }

  async updateUserData(data: any, id: string) {
    try {
      const user = await userRepository.findOne({
        where: { id, deleted_at: IsNull() },
      });
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
          { id: Like(`%${search}%`), deleted_at: IsNull() },
          { email: Like(`%${search}%`), deleted_at: IsNull() },
          { name: Like(`%${search}%`), deleted_at: IsNull() },
          { phone: Like(`%${search}%`), deleted_at: IsNull() },
        ],
      });
      const total_users = await userRepository.count({
        where: [
          { id: Like(`%${search}%`), deleted_at: IsNull() },
          { email: Like(`%${search}%`), deleted_at: IsNull() },
          { name: Like(`%${search}%`), deleted_at: IsNull() },
          { phone: Like(`%${search}%`), deleted_at: IsNull() },
        ],
      });
      return { users, total_users };
    } catch (error) {
      throw error;
    }
  }

  async getDeletedUsers(take: number, skip: number, search: string) {
    try {
      const users = await userRepository.find({
        where: [
          { id: Like(`%${search}%`), deleted_at: Not(IsNull()) },
          { email: Like(`%${search}%`), deleted_at: Not(IsNull()) },
          { name: Like(`%${search}%`), deleted_at: Not(IsNull()) },
          { phone: Like(`%${search}%`), deleted_at: Not(IsNull()) },
        ],
        select: ["id", "name", "email", "phone", "deleted_at", "gender"],
        take,
        skip,
      });

      const total_users = await userRepository.count({
        where: [
          { id: Like(`%${search}%`), deleted_at: Not(IsNull()) },
          { email: Like(`%${search}%`), deleted_at: Not(IsNull()) },
          { name: Like(`%${search}%`), deleted_at: Not(IsNull()) },
          { phone: Like(`%${search}%`), deleted_at: Not(IsNull()) },
        ],
      });

      return { users, total_users };
    } catch (error) {
      throw error;
    }
  }
}
