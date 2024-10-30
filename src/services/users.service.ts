import ApplicationError from "../error/ApplicationError";
import { SaveUserParams } from "../types/user.types";
import { UserOptional, Id } from "../types/user.types";
import { userRepository } from "../repository/user.repository";
import { roleRepository } from "../repository/role.repository";
import { QueryFailedError } from "typeorm";

export default class UserService {
  async updateUser(user: UserOptional & Id) {
    try {
      const updatedUser = await this.getUser({ id: user.id });
      if (!updatedUser) {
        throw new ApplicationError(404, "User not found !");
      }

      if (user.gst_num && updatedUser.gst_num) {
        {
          throw new ApplicationError(400, "Can't update the Details");
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
}
 