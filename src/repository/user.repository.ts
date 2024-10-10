import { User } from "../entity/user.entity";
import { AppDataSource } from "../db/data-source";

export const userRepository = AppDataSource.getRepository(User);
