import { Router } from "express";
import userRouter from "./users.route";

const mainRouter = Router();

mainRouter.use("/api/users", userRouter);
export default mainRouter;
