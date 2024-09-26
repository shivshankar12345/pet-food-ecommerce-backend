import { AppDataSource } from "../db/data-source";
import { User } from "../entity/user.entity";
import ApplicationError from "../error/ApplicationError";
import { SaveUserParams } from "../types/user.types";
import { UpdateUser } from "../types/user.types";
const userRepository = AppDataSource.getRepository(User);

export default class UserService {
  async updateUser(user: UpdateUser) {
    try {
      const updatedUser = await userRepository.findOne({
        where: { id: user.id },
      });
      if (!updatedUser) {
        throw new ApplicationError(404, "User not found !");
      }
      Object.assign(updatedUser, {
        ...user,
        updated_at: new Date().toISOString(),
      });
      await userRepository.save(updatedUser);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
  async saveUser(user: SaveUserParams) {
    try {
      const existingUser = await userRepository.findOne({
        where: { email: user.email },
      });
      if (existingUser) {
        return existingUser;
      }
      const newUser = await userRepository.save(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }
}
