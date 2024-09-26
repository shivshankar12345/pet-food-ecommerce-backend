import { Response } from "express";

export default class Responses {
  static generateSuccessResponse(res: Response, statusCode: number, data: any) {
    return res.status(statusCode).json({ success: true, ...data });
  }
  static generateErrorResponse(res: Response, statusCode: number, data: any) {
    return res.status(statusCode).json({ success: false, ...data });
  }
}
