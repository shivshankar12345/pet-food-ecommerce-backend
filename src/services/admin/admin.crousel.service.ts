import { crouselRepository } from "../../repository/crousel.repository";
import { CrouselObject } from "../../types/crousel.types";
export default class AdminCrouselManageService {
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
}
