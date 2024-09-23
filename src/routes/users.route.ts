import { NextFunction, Request, Response, Router } from "express";
import ApplicationError from "../error/ApplicationError";
import { AppDataSource } from "../db/data-source";
import { User } from "../entity/user.entity";

const userRouter = Router();
const userRepository = AppDataSource.getRepository(User);
userRouter.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, phone, password, role, gender } = req.body;
      if (!name || !email || !phone || !password || !role || !gender) {
        throw new ApplicationError(406, "Please fill Required fields");
      }

      const newUser = await userRepository.save(req.body);
      console.log(newUser);
      res.status(200).json({ success: true, message: "User Created" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

userRouter.post(
  "/signin",
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ success: true, message: "Singin Successfully !!" });
  }
);
export default userRouter;
