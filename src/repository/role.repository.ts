import { Role } from "../entity/role.entity";
import { AppDataSource } from "../db/data-source";

export const roleRepository = AppDataSource.getRepository(Role);
