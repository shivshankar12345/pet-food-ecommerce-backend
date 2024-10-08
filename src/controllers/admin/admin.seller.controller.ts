import { NextFunction, Request, Response } from "express";
import AdminSellerManageService from "../../services/admin/admin.sellers.service";
import Responses from "../../modules/responses";
import ApplicationError from "../../error/ApplicationError";

const adminSellerService = new AdminSellerManageService();
export default class AdminSellerManageController {
  async getVerifiedSeller(req: Request, res: Response, next: NextFunction) {
    try {
      let { limit, page_num, search = "" } = req.query;
      const limitOfDocs = limit ? parseInt(limit as string) : 10;
      const skipElements =
        (page_num ? parseInt(page_num as string) - 1 : 0) * limitOfDocs;
      const verifiedSellers = await adminSellerService.getVerified(
        skipElements,
        limitOfDocs,
        search as string
      );

      const total_pages =
        Math.trunc(verifiedSellers.total_verified_sellers / limitOfDocs) ==
        verifiedSellers.total_verified_sellers / limitOfDocs
          ? verifiedSellers.total_verified_sellers / limitOfDocs
          : Math.trunc(verifiedSellers.total_verified_sellers / limitOfDocs) +
            1;
      return Responses.generateSuccessResponse(res, 200, {
        ...verifiedSellers,
        total_pages,
        current_page: page_num ? parseInt(page_num as string) : 1,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPendingSeller(req: Request, res: Response, next: NextFunction) {
    try {
      let { limit, page_num, search = "" } = req.query;
      const limitOfDocs = limit ? parseInt(limit as string) : 10;
      const skipElements =
        (page_num ? parseInt(page_num as string) - 1 : 0) * limitOfDocs;
      const pendingSeller = await adminSellerService.getPending(
        skipElements,
        limitOfDocs,
        search as string
      );

      const total_pages =
        Math.trunc(pendingSeller.total_pending_sellers / limitOfDocs) ==
        pendingSeller.total_pending_sellers / limitOfDocs
          ? pendingSeller.total_pending_sellers / limitOfDocs
          : Math.trunc(pendingSeller.total_pending_sellers / limitOfDocs) + 1;

      return Responses.generateSuccessResponse(res, 200, {
        ...pendingSeller,
        total_pages,
        current_page: page_num ? parseInt(page_num as string) : 1,
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
