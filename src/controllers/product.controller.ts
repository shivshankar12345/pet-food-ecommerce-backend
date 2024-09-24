import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { Product as ProductType } from "../types/product.types";
import ApplicationError from "../error/ApplicationError";
import { checkRequiredValidation } from "../modules/validation";

const productService = new ProductService();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      categoryId,
      price,
      description,
      stock,
      brandId,
      sellerId,
      petType,
    } = req.body;

    const validationData = await checkRequiredValidation([
      { field: "Name", value: name, type: "Empty" },
      { field: "Category ID", value: categoryId, type: "Empty" },
      { field: "Price", value: price, type: "Empty" },
      { field: "Description", value: description, type: "Empty" },
      { field: "Stock", value: stock, type: "Empty" },
      { field: "Brand ID", value: brandId, type: "Empty" },
      { field: "Seller ID", value: sellerId, type: "Empty" },
      { field: "Pet Type", value: petType, type: "Empty" },
    ]);

    if (!validationData.status) {
      return res.status(400).json({ message: validationData.message });
    }

    const imageUrl = req.file?.path;
    if (!imageUrl) {
      return res.status(400).json({ message: "Image file is required." });
    }

    const productData: ProductType = {
      name,
      categoryId: parseInt(categoryId, 10),
      price: parseFloat(price),
      description,
      stock: parseInt(stock, 10),
      imageUrl,
      brandId: parseInt(brandId, 10),
      sellerId: parseInt(sellerId, 10),
      petType,
    };

    const newProduct = await productService.createProduct(productData);
    return res.status(201).json(newProduct);
  } catch (error: any) {
    if (error instanceof ApplicationError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;

  try {
    const { products, total } = await productService.getAllProducts(
      page,
      limit
    );

    if (products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }

    return res.status(200).json({
      success: true,
      data: products,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    if (error instanceof ApplicationError) {
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
