//* Packages
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";

//* Internal Modules
import mainRouter from "./routes";
import ApplicationError from "./error/ApplicationError";
import Responses from "./modules/responses";

//* Initialize Server
const app: Express = express();

//* Middlewares
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//* Routes
app.get("/", (req: Request, res: Response) => {
  return Responses.generateSuccessResponse(res, 200, {
    message: "Nodejs with Typescript Running !!",
  });
});

app.use(mainRouter);

//* Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApplicationError) {
    return Responses.generateErrorResponse(res, err.statusCode, {
      message: err.message,
    });
  }

  Responses.generateErrorResponse(res, 500, {
    message: "Internal Server Error",
  });
});

//* Invalid path
app.use((req: Request, res: Response, next: NextFunction) => {
  return Responses.generateErrorResponse(res, 404, {
    message: "Resource not found",
  });
});

export default app;
