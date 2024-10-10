import { AppDataSource } from "../../db/data-source";
import { Permission } from "../../entity/permission.entity";

const permissionRepository = AppDataSource.getRepository(Permission);
export default class AdminPermissionManageService {
  async create(permission: { permission: string }) {
    try {
      await permissionRepository.save(permission);
    } catch (error) {
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
