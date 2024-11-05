import { NextFunction, Request, Response } from "express";

export const approveSeller = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body.is_verified = true;
  next();
};

export const rejectSeller = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body.is_verified = false;
  next();
};
