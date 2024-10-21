import { Request, Response } from "express";
import { categoryRepository } from "../repository/category.respository";
import { checkRequiredValidation } from "../modules/validation";
import ApplicationError from "../error/ApplicationError";

export const createCategory = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const { name, description } = req.body;

  const validationData = await checkRequiredValidation([
    { field: "CategoryName", value: name, type: "Empty" },
  ]);

  const trimmedName = name.trim();

  if (!trimmedName) {
    return next(new ApplicationError(400, "Category Name is required"));
  }

  try {
    const existingCategory = await categoryRepository.findOne({
      where: { name },
    });

    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Category with this name already exists." });
    }

    const newCategory = categoryRepository.create({ name, description });
    const savedCategory = await categoryRepository.save(newCategory);

    return res.status(201).json(savedCategory);
  } catch (error: any) {
    console.error("Error creating category:", error);
    return next(new ApplicationError(500, "Error creating category"));
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const categories = await categoryRepository.find();
    return res.status(200).json(categories);
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    return next(new ApplicationError(500, "Error fetching categories")); // Handle any errors
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const CategoryId = req.query.id as string;
    if (!CategoryId) {
      throw new ApplicationError(400, "Category ID is required");
    }

    const validationData = await checkRequiredValidation([
      { field: "Category ID", value: CategoryId, type: "Empty" },
    ]);

    if (!validationData.status) {
      throw new ApplicationError(400, validationData.message);
    }
    const category = await categoryRepository.findOneBy({ id: CategoryId });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const UpdateCategoryById = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const categoryId = req.query.id as string;
    const { name, description } = req.body;

    if (!categoryId) {
      throw new ApplicationError(400, "Category ID is required");
    }

    if (!name || typeof name !== "string" || !name.trim()) {
      throw new ApplicationError(400, "Category Name is required");
    }

    const validationData = await checkRequiredValidation([
      { field: "Category ID", value: categoryId, type: "Empty" },
      { field: "Category Name", value: name, type: "Empty" },
    ]);

    if (!validationData.status) {
      throw new ApplicationError(400, validationData.message);
    }

    const existingCategory = await categoryRepository.findOneBy({
      id: categoryId,
    });

    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    existingCategory.name = name.trim();
    existingCategory.description = description || existingCategory.description;

    const updatedCategory = await categoryRepository.save(existingCategory);

    return res.status(200).json({
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    next(new ApplicationError(500, "Error updating category"));
  }
};

export const softDeleteCategory = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const categoryId = req.query.id as string;

    if (!categoryId) {
      throw new ApplicationError(400, "Category Id is required");
    }

    const validationData = await checkRequiredValidation([
      { field: "Category Id", value: categoryId, type: "Empty" },
    ]);

    if (!validationData.status) {
      throw new ApplicationError(400, validationData.message);
    }

    const category = await categoryRepository.findOneBy({ id: categoryId });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.isDeleted = true;

    await categoryRepository.save(category);

    return res.status(200).json({ message: "Category is soft-deleted" });
  } catch (error) {
    next(error);
  }
};
