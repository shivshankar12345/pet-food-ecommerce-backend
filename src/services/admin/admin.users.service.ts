import { User } from "../../entity/user.entity";
import { AppDataSource } from "../../db/data-source";

const userRepository = AppDataSource.getRepository(User);
export default class AdminUserManageService {
  async getUsers(activationStatus: boolean) {
    const users = await userRepository.find({
      where: { is_active: activationStatus },
      select: ["id", "name", "email", "phone", "is_active"],
    });
    return users;
  }
}
