import { NextFunction, Request, Response } from "express";
import { uploadToCloudinary } from "../../utils/cloudinary";
import ApplicationError from "../../error/ApplicationError";
import AdminCrouselManageService from "../../services/admin/admin.crousel.service";
import Responses from "../../modules/responses";

const adminCrouselService = new AdminCrouselManageService();

export default class AdminLandingPageManageController {
  async addCrousel(req: Request, res: Response, next: NextFunction) {
    try {
      const imageFile = req.file;
      if (!imageFile) {
        throw new ApplicationError(400, "Image is Required !!");
      }
      const cloudinaryResponse = await uploadToCloudinary(imageFile, "Crousel");
      const imageUrl = cloudinaryResponse.secure_url;
      await adminCrouselService.addCrouselData({ imageUrl });
      return Responses.generateSuccessResponse(res, 201, {
        message: "Image Uploaded Successfuly !!",
      });
    } catch (error) {
      next(error);
    }
  }
  async getCrousel(req: Request, res: Response, next: NextFunction) {
    try {
      const crouselData = await adminCrouselService.getCrouselData();
      return Responses.generateSuccessResponse(res, 200, { crouselData });
    } catch (error) {
      next(error);
    }
  }
}
