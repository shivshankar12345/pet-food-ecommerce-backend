import { QueryFailedError } from "typeorm";
import { AppDataSource } from "../../db/data-source";
import { Permission } from "../../entity/permission.entity";
import { Role } from "../../entity/role.entity";
import ApplicationError from "../../error/ApplicationError";

const roleRepository = AppDataSource.getRepository(Role);
const permissionRepositry = AppDataSource.getRepository(Permission);
export default class AdminRoleManageService {
  async create({
    role_name,
    permission,
  }: {
    role_name: string;
    permission: string;
  }) {
    try {
      const permissionObject = await permissionRepositry.findOne({
        where: { permission },
      });
      if (!permissionObject) {
        throw new ApplicationError(400, "Incorrect Permission");
      }

      await roleRepository.save({ role_name, permission: permissionObject });
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error?.driverError?.message?.includes("Duplicate entry")
      ) {
        throw new ApplicationError(400, "Role Already Exist ");
      }
      throw error;
    }
  }
  async get() {
    try {
      const roles = await roleRepository
        .createQueryBuilder("role")
        .innerJoinAndSelect("role.permission", "permission")
        .select(["role.id", "permission.permission", "role.role_name"])
        .getMany();
      return roles.map(({ id, permission, role_name }) => ({
        id,
        role_name,
        permission: permission.permission,
      }));
    } catch (error) {
      throw error;
    }
  }
}
