import { NextFunction, Request, Response } from "express";
import ApplicationError from "../error/ApplicationError";
import { userRepository } from "../repository/user.repository";

const customerAuth = async (
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

    if (userExist.role.role_name != "customer") {
      throw new ApplicationError(
        400,
        "Only Customer is Allowed to Raise the Request"
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default customerAuth;
