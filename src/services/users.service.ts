import { AppDataSource } from "../db/data-source";
import { User } from "../entity/user.entity";
import { SaveUserParams } from "../types/user.types";

const userRepository = AppDataSource.getRepository(User);

export default class UserService {
  async updateUser() {}
  async saveUser(user: SaveUserParams) {
    try {
      const newUser = userRepository.save(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }
}
