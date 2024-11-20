import { NextFunction, Request, Response } from "express";
import ApplicationError from "../error/ApplicationError";
import { userRepository } from "../repository/user.repository";

const validateSellerAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req as any;
    const userExist = await userRepository.findOne({
      where: { id },
      relations: { role: true },
    });
    if (!userExist) {
      throw new ApplicationError(400, "Please Login first ");
    }

    if (userExist.role.role_name != "seller") {
      throw new ApplicationError(400, "Only Seller Can access this Page !!");
    }

    if (!userExist.is_verified) {
      throw new ApplicationError(
        400,
        "you need to verify your acount ! Please Contact Admin"
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default validateSellerAccount;
