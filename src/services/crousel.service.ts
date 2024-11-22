import { Like } from "typeorm";
import ApplicationError from "../error/ApplicationError";
import { crouselRepository } from "../repository/crousel.repository";
import { CrouselObject } from "../types/crousel.types";
import { deleteFromCloudinary } from "../utils/cloudinary";

export default class CrouselService {
  async getCrouselData(take: number, search: string, skip: number) {
    try {
      const data = await crouselRepository.find({
        where: { name: Like(`%${search}%`) },
        take,
        skip,
        order: { priority: "ASC" },
      });

      const total_images = await crouselRepository.count({
        where: { name: Like(`%${search}%`) },
        take,
        skip,
      });
      return { crousel: data, total_images };
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

  async updateCrousel(id: string, data: any) {
    try {
      const crousel = await crouselRepository.findOne({ where: { id } });
      if (!crousel) {
        throw new ApplicationError(404, "Crousel not found !!");
      }
      Object.assign(crousel, data);
      await crouselRepository.save(crousel);
    } catch (error) {
      throw error;
    }
  }
}
