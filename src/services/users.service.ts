import ApplicationError from "../error/ApplicationError";
import { SaveUserParams } from "../types/user.types";
import { UserOptional, Id } from "../types/user.types";
import { userRepository } from "../repository/user.repository";
import { roleRepository } from "../repository/role.repository";
import { IsNull, Like, Not, QueryFailedError } from "typeorm";

export default class UserService {
  async updateUser(user: UserOptional & Id) {
    try {
      const updatedUser = await this.getUser({ id: user.id });
      if (!updatedUser) {
        throw new ApplicationError(404, "User not found !");
      }

      if (user.gst_num && updatedUser.gst_num) {
        {
          throw new ApplicationError(400, "Seller Request Already Created !!");
        }
      }
      Object.assign(updatedUser, {
        ...user,
        updated_at: new Date().toISOString(),
      });
      await userRepository.save(updatedUser);
      return updatedUser;
    } catch (error: any) {
      if (
        error instanceof QueryFailedError &&
        error?.driverError?.message?.includes("Duplicate entry")
      ) {
        throw new ApplicationError(400, "Phone Already Exist ");
      }
      throw error;
    }
  }
  async saveUser(user: SaveUserParams) {
    try {
      const existingUser = await userRepository.findOne({
        where: { email: user.email },
        relations: {
          role: true,
        },
      });
      if (existingUser) {
        if (!existingUser.name || !existingUser.phone) {
          return { user: existingUser, newUser: true };
        }
        return { user: existingUser, newUser: false };
      }
      const role = await roleRepository.findOne({
        where: { role_name: "customer" },
      });
      if (!role) {
        throw new Error("");
      }

      const createUser = userRepository.create({ ...user, role });
      const newUser = await userRepository.save(createUser);
      return { user: newUser, newUser: true };
    } catch (error) {
      throw error;
    }
  }

  async getUser(filter: UserOptional | Id) {
    try {
      const user = await userRepository.findOne({
        where: filter,
        relations: { role: true },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

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
