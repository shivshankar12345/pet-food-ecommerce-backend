import { AppDataSource } from "../db/data-source";
import { Crousel } from "../entity/crousel.entity";

export const crouselRepository = AppDataSource.getRepository(Crousel);
