import { AppDataSource } from "../db/data-source";
import { Pet } from "../entity/pet.entity";

export const PetRepository = AppDataSource.getRepository(Pet)