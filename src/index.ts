//* Packages
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";

//* Internal Modules
import mainRouter from "./routes";
import ApplicationError from "./error/ApplicationError";

//* Initialize Server
const app: Express = express();

//* Middlewares
app.use(
  cors({ methods: ["GET", "POST", "PUT", "DELETE"], origin: "localhost" })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//* Home Route
app.get("/", (req: Request, res: Response): void => {
  res
    .status(200)
    .json({ success: true, message: "Nodejs with Typescript Running !!" });
});

//* Routes for Features
app.use(mainRouter);

//* Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (err instanceof ApplicationError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
  }
  return res
    .status(500)
    .json({ success: false, message: "Internal Server Error" });
});

//* Invalid path
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, message: "Resource not found" });
});

export default app;
