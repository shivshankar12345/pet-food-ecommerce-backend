import { QueryFailedError } from "typeorm";
import { AppDataSource } from "../db/data-source";
import { Permission } from "../entity/permission.entity";
import ApplicationError from "../error/ApplicationError";

const permissionRepository = AppDataSource.getRepository(Permission);
export default class PermissionService {
  async create(permission: { permission: string }) {
    try {
      await permissionRepository.save(permission);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error?.driverError?.message?.includes("Duplicate entry")
      ) {
        throw new ApplicationError(400, "Permission Already Exist ");
      }
      throw error;
    }
  }

  async get() {
    try {
      const permissions = await permissionRepository.find();
      return permissions;
    } catch (error) {
      throw error;
    }
  }
}
