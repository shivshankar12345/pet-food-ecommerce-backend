import { NextFunction, Request, Response } from "express";
import ApplicationError from "../error/ApplicationError";
import { userRepository } from "../repository/user.repository";

async function validateAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userRepository.findOne({
      where: { id: (req as any).id },
      relations: { role: true },
    });

    if (user?.role.role_name != "admin") {
      throw new ApplicationError(401, "This Page Allows for Admin");
    }
    next();
  } catch (error) {
    next(error);
  }
}
export default validateAdmin;
