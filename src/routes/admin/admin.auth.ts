import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../db/data-source";
import { User } from "../../entity/user.entity";
import ApplicationError from "../../error/ApplicationError";
import Responses from "../../modules/responses";

const userRepository = AppDataSource.getRepository(User);
async function validateAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userRepository.findOne({
      where: { id: (req as any).id },
    });
    if (!user) {
      throw new ApplicationError(401, "UnAuthorized Access");
    }
    next();
  } catch (error) {
    next(error);
  }
}
export default validateAdmin;
