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
      // {
      //   asset_id: 'ff013630e00699fe9f1456e19dfe9e53',
      //   public_id: 'Crousel/iqpj0b7sqrlw59wgnbkw',
      //   version: 1730727359,
      //   version_id: '1d25b87fb67e18fac45dfde7e9e3bad4',
      //   signature: '9ee999830028ecdcb59923eb0fb944d2e5a87e35',
      //   width: 1600,
      //   height: 464,
      //   format: 'webp',
      //   resource_type: 'image',
      //   created_at: '2024-11-04T13:35:59Z',
      //   tags: [],
      //   pages: 1,
      //   bytes: 89004,
      //   type: 'upload',
      //   etag: 'f7294d756fbc284f87336c0c231a5dc9',
      //   placeholder: false,
      //   url: 'http://res.cloudinary.com/dehw6yjjr/image/upload/v1730727359/Crousel/iqpj0b7sqrlw59wgnbkw.webp',
      //   secure_url: 'https://res.cloudinary.com/dehw6yjjr/image/upload/v1730727359/Crousel/iqpj0b7sqrlw59wgnbkw.webp',
      //   asset_folder: 'Crousel',
      //   display_name: 'iqpj0b7sqrlw59wgnbkw',
      //   original_filename: 'file',
      //   api_key: '711867882192281'
      // }

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
