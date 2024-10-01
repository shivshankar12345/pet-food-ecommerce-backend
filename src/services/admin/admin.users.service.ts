import { User } from "../../entity/user.entity";
import { AppDataSource } from "../../db/data-source";
import ApplicationError from "../../error/ApplicationError";

const userRepository = AppDataSource.getRepository(User);

export default class AdminUserManageService {
  async getUsers(activationStatus: boolean) {
    try {
      const users = await userRepository.find({
        where: { is_active: activationStatus },
        select: ["id", "name", "email", "phone", "is_active"],
      });
      return users;
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
}
