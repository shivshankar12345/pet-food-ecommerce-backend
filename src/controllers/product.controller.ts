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

    const validationData: any = await checkRequiredValidation([
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

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string | null;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required." });
    }
    const validationData = await checkRequiredValidation([
      { field: "Product ID", value: id, type: "Empty" },
    ]);

    if (!validationData.status) {
      return res.status(400).json({ message: validationData.message });
    }

  

    const product = await productService.getProductById(parseInt(id,10));

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    if (error instanceof ApplicationError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string | null;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const validationData = await checkRequiredValidation([
      { field: "Product ID", value: id, type: "Empty" },
    ]);

    if (!validationData.status) {
      return res.status(400).json({ message: validationData.message });
    }

    const existingProduct = await productService.getProductById(
      parseInt(id, 10)
    );

    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Prepare product data for update
    const productData: Partial<ProductType> = {
      ...req.body,
      id: existingProduct.id, // Keep the existing ID
      imageUrl: req.file ? req.file.path : existingProduct.imageUrl,
      createdAt: existingProduct.createdAt, // Retain existing createdAt
      updatedAt: new Date(),
    };

    const updatedProduct = await productService.updateProduct(
      existingProduct.id,
      productData
    );

    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error: any) {
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
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string | null;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const validationData = await checkRequiredValidation([
      { field: "Product ID", value: id, type: "Empty" },
    ]);

    if (!validationData.status) {
      return res.status(400).json({ message: validationData.message });
    }

    const productId = parseInt(id, 10);
    const existingProduct = await productService.getProductById(productId);

    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Perform soft delete by setting isDeleted to true
    await productService.deleteProduct(productId);

    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error: any) {
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
