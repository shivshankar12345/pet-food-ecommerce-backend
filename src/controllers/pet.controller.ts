import { Request, Response, NextFunction } from "express";
import { PetRepository } from "../repository/pet.repository";
import { checkRequiredValidation } from "../modules/validation";
import ApplicationError from "../error/ApplicationError";
import { Like } from "typeorm";

export const createPet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description } = req.body;

  const validationData = await checkRequiredValidation([
    { field: "Pet Name", value: name, type: "Empty" },
  ]);

  if (!validationData.status) {
    return next(new ApplicationError(400, validationData.message));
  }
  const trimmedName = name.trim();
  if (!trimmedName) {
    return next(new ApplicationError(400, "Pet Name is required"));
  }
  try {
    const newPet = PetRepository.create({ name, description });
    const savedPet = await PetRepository.save(newPet);
    return res.status(201).json(savedPet);
  } catch (error) {
    console.error("Error creating pet:", error);
    next(new ApplicationError(500, "Error creating pet"));
  }
};

export const getAllPets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const search = (req.query.search as string)?.trim() || "";
    const [pets, total] = await PetRepository.findAndCount({
      where: { isDeleted: false, ...(search && { name: Like(`%${search}%`) }) },
      skip: (page - 1) * limit,
      take: limit,
    });
    return res.status(200).json({
      data: pets,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: total,
        totalPages: Math.ceil(total/ limit), 
      },
    });
  } catch (error) {
    console.error("Error fetching pets:", error);
    next(new ApplicationError(500, "Error fetching pets"));
  }
};

export const getPetById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const petId = req.params.id;

  const validationData = await checkRequiredValidation([
    { field: "Pet ID", value: petId, type: "Empty" },
  ]);

  if (!validationData.status) {
    return next(new ApplicationError(400, validationData.message));
  }

  try {
    const pet = await PetRepository.findOne({
      where: { id: petId, isDeleted: false },
    });

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    return res.status(200).json(pet);
  } catch (error) {
    console.error("Error fetching pet:", error);
    next(new ApplicationError(500, "Error fetching pet"));
  }
};

export const updatePetById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const petId = req.params.id;
  const { name, description } = req.body;

  const validationData = await checkRequiredValidation([
    { field: "Pet ID", value: petId, type: "Empty" },
    { field: "Pet Name", value: name, type: "Empty" },
  ]);

  if (!validationData.status) {
    return next(new ApplicationError(400, validationData.message));
  }

  try {
    const existingPet = await PetRepository.findOne({
      where: { id: petId, isDeleted: false },
    });

    if (!existingPet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    existingPet.name = name.trim();
    existingPet.description = description || existingPet.description;

    const updatedPet = await PetRepository.save(existingPet);

    return res.status(200).json({
      message: "Pet updated successfully",
      data: updatedPet,
    });
  } catch (error) {
    console.error("Error updating pet:", error);
    next(new ApplicationError(500, "Error updating pet"));
  }
};

export const softDeletePet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const petId = req.params.id;

  const validationData = await checkRequiredValidation([
    { field: "Pet ID", value: petId, type: "Empty" },
  ]);

  if (!validationData.status) {
    return next(new ApplicationError(400, validationData.message));
  }

  try {
    const pet = await PetRepository.findOne({
      where: { id: petId, isDeleted: false },
    });

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    pet.isDeleted = true;
    await PetRepository.save(pet);

    return res.status(200).json({ message: "Pet is soft-deleted" });
  } catch (error) {
    console.error("Error soft-deleting pet:", error);
    next(new ApplicationError(500, "Error soft-deleting pet"));
  }
};
