import { NextFunction, Request, Response } from "express";
import { uploadToCloudinary } from "../utils/cloudinary";
import Responses from "../modules/responses";
import ApplicationError from "../error/ApplicationError";
import LandingPageService from "../services/landingPage.service";

const landingPageService = new LandingPageService();

export default class LandingPageController {
  async addCrousel(req: Request, res: Response, next: NextFunction) {
    try {
      const imageFile = req.file;
      const { name } = req.body;
      if (!imageFile || !name) {
        throw new ApplicationError(400, "Provide Required fields !!");
      }
      const cloudinaryResponse = await uploadToCloudinary(imageFile, "Crousel");
      const imageUrl = cloudinaryResponse.secure_url;
      await landingPageService.addCrouselData({ imageUrl, name });
      return Responses.generateSuccessResponse(res, 201, {
        message: "Image Uploaded Successfuly !!",
      });
    } catch (error) {
      next(error);
    }
  }

  async getCrousel(req: Request, res: Response, next: NextFunction) {
    try {
      const crouselData = await landingPageService.getCrouselData();
      return Responses.generateSuccessResponse(res, 200, { crouselData });
    } catch (error) {
      next(error);
    }
  }

  async deleteCrousel(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ApplicationError(400, "Please Provide Crousel ID");
      }
      await landingPageService.deleteCrouselData(id);
      return Responses.generateSuccessResponse(res, 200, {
        message: "Crousel Delete Successfully !!",
      });
    } catch (error) {
      next(error);
    }
  }
}
