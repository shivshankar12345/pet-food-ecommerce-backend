import { NextFunction, Request, Response } from "express";
import AdminSellerManageService from "../../services/admin/admin.sellers.service";
import Responses from "../../modules/responses";
import ApplicationError from "../../error/ApplicationError";

const adminSellerService = new AdminSellerManageService();
export default class AdminSellerManageController {
  async getVerifiedSeller(req: Request, res: Response, next: NextFunction) {
    try {
      const seller = await adminSellerService.getActive();
      return Responses.generateSuccessResponse(res, 200, { seller });
    } catch (error) {
      next(error);
    }
  }
  async getPendingSeller(req: Request, res: Response, next: NextFunction) {
    try {
      const pendingSeller = await adminSellerService.getPending();
      return Responses.generateSuccessResponse(res, 200, { pendingSeller });
    } catch (error) {
      next(error);
    }
  }
  async changeSellerStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, is_verified = null } = req.body;
      if (!id || is_verified == null) {
        throw new ApplicationError(400, "Please Enter Required fields !!");
      }
      await adminSellerService.updateSeller({ id, is_verified });
      return Responses.generateSuccessResponse(res, 200, {
        message: "Seller updated Successfully !!",
      });
    } catch (error) {
      next(error);
    }
  }
}
