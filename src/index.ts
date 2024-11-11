//* Packages
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import swagger from "swagger-ui-express";
import swaggerJson from "../swagger.json";

//* Internal Modules
import mainRouter from "./routes/index.routes";
import ApplicationError from "./error/ApplicationError";
import Responses from "./modules/responses";

//* Initialize Server
const app: Express = express();

//* Create Log file Stream
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log")
);

//* Middlewares
app.use(
  morgan("combined", {
    skip(req, res) {
      return res.statusCode < 400;
    },
    stream: accessLogStream,
  })
);

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

app.use("/apiDocs", swagger.serve, swagger.setup(swaggerJson));

app.use("/api", mainRouter);

//* Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
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
