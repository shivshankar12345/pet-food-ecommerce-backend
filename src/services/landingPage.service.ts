import ApplicationError from "../error/ApplicationError";
import { crouselRepository } from "../repository/crousel.repository";
import { CrouselObject } from "../types/crousel.types";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary";

export default class LandingPageService {
  async getCrouselData() {
    try {
      const data = await crouselRepository.find();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async addCrouselData(crouselData: CrouselObject) {
    try {
      const crousel = await crouselRepository.save(crouselData);
      return crousel;
    } catch (error) {
      throw error;
    }
  }

  async deleteCrouselData(id: string) {
    try {
      const crousel = await crouselRepository.findOne({ where: { id } });
      if (!crousel) {
        throw new ApplicationError(400, "Crousel not found !!");
      }
      await deleteFromCloudinary(crousel.imageUrl);
      await crouselRepository.remove(crousel);
    } catch (error) {
      throw error;
    }
  }
}
