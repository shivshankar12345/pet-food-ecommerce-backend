import ApplicationError from "../error/ApplicationError";
import { SaveUserParams } from "../types/user.types";
import { UpdateUser } from "../types/user.types";
import { userRepository } from "../repository/user.repository";
import { roleRepository } from "../repository/role.repository";
 
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
        throw new ApplicationError(500, "Something went wrong !!");
      }
 
      const createUser = userRepository.create({ ...user, role });
      const newUser = await userRepository.save(createUser);
      return { user: newUser, newUser: true };
    } catch (error) {
      throw error;
    }
  }
}
 
