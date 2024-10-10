import { AppDataSource } from "../db/data-source";
import { Permission } from "../entity/permission.entity";

export const permissionRepositry = AppDataSource.getRepository(Permission);
