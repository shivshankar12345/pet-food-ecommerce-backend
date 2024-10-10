import { Request, Response, NextFunction } from "express";
import { userRepository } from "../../repository/user.repository";
import ApplicationError from "../../error/ApplicationError";

async function validateSeller(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req as any;
    const user = await userRepository.findOne({
      where: { id },
      relations: { role: true },
    });
    if (!user) {
      throw new ApplicationError(400, "Something went wrong !!");
    }
    if (user.role.role_name != "seller") {
      throw new ApplicationError(403, "Only Seller is Allowed ");
    }
    next();
  } catch (error) {
    next(error);
  }
}

export default validateSeller;
