import { User } from "../../entity/user.entity";
import { AppDataSource } from "../../db/data-source";
import ApplicationError from "../../error/ApplicationError";

const userRepository = AppDataSource.getRepository(User);

export default class AdminUserManageService {
  async getUsers(activationStatus: boolean, skip: number, take: number) {
    try {
      console.log(skip, take);
      const users = await userRepository.find({
        where: { is_active: activationStatus },
        select: ["id", "name", "email", "phone", "is_active"],
        skip,
        take,
      });

      const totalUsers = await userRepository.count();
      return { users, totalUsers };
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

  async getAllUsers() {
    try {
      const user = await userRepository.find({
        select: ["id", "name", "email", "phone", "is_active", "gender"],
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      const deletedUser = await userRepository.delete({ id });
      if ((deletedUser.affected as number) > 0) {
        throw new ApplicationError(404, "User not found");
      }
    } catch (error) {
      throw error;
    }
  }
}
