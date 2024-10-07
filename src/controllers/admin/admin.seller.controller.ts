import { NextFunction, Request, Response } from "express";
import AdminSellerManageService from "../../services/admin/admin.sellers.service";
import Responses from "../../modules/responses";
import ApplicationError from "../../error/ApplicationError";

const adminSellerService = new AdminSellerManageService();
export default class AdminSellerManageController {
  async getVerifiedSeller(req: Request, res: Response, next: NextFunction) {
    try {
      let { limit, page_num } = req.query;
      const limitOfDocs = limit ? parseInt(limit as string) : 10;
      const skipElements =
        (page_num ? parseInt(page_num as string) - 1 : 0) * limitOfDocs;
      const verifiedSellers = await adminSellerService.getActive(
        skipElements,
        limitOfDocs
      );
      return Responses.generateSuccessResponse(res, 200, {
        ...verifiedSellers,
        total_pages: verifiedSellers.total_active_sellers / limitOfDocs,
        current_page: page_num || 1,
      });
    } catch (error) {
      next(error);
    }
  }
  async getPendingSeller(req: Request, res: Response, next: NextFunction) {
    try {
      let { limit, page_num } = req.query;
      const limitOfDocs = limit ? parseInt(limit as string) : 10;
      const skipElements =
        (page_num ? parseInt(page_num as string) - 1 : 0) * limitOfDocs;
      const pendingSeller = await adminSellerService.getPending(
        skipElements,
        limitOfDocs
      );
      return Responses.generateSuccessResponse(res, 200, {
        ...pendingSeller,
        total_pages: pendingSeller.total_pending_sellers / limitOfDocs,
        current_page: page_num || 1,
      });
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
