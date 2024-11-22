import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";
import { Product as ProductType } from "../types/product.types";
import ApplicationError from "../error/ApplicationError";
import { checkRequiredValidation } from "../modules/validation";
import { uploadToCloudinary } from "../utils/cloudinary";
import Responses from "../modules/responses";
import { categoryRepository } from "../repository/category.respository";
import { PetRepository } from "../repository/pet.repository";

const productService = new ProductService();

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      category: categoryName,
      price,
      description,
      stock,
      brandId,
      sellerId,
      petType,
      discounted_percentage,
    } = req.body;

    const validationData: any = await checkRequiredValidation([
      { field: "Name", value: name, type: "Empty" },
      { field: "Category", value: categoryName, type: "Empty" },
      { field: "Price", value: price, type: "Empty" },
      { field: "Description", value: description, type: "Empty" },
      { field: "Stock", value: stock, type: "Empty" },
      { field: "Brand ID", value: brandId, type: "Empty" },
      { field: "Seller ID", value: sellerId, type: "Empty" },
      { field: "Pet Type", value: petType, type: "Empty" },
      {field:"discounted percentage", value:discounted_percentage,type:"Empty"}
    ]);

    if (!validationData.status) {
      throw new ApplicationError(400, "All fields are required");
    }

    const existingPet = await PetRepository.findOne({
      where: { name: petType },
    });

    if (!existingPet) {
      throw new ApplicationError(400, "Invalid pet type");
    }

    const existingCategory = await categoryRepository.findOne({
      where: { name: categoryName },
    });

    if (!existingCategory) {
      throw new ApplicationError(400, "Invalid category name");
    }

    const imageFile = req.file;
    if (!imageFile) {
      throw new ApplicationError(400, "Image file is required");
    }
    const CloudinaryResponse = await uploadToCloudinary(imageFile, "products");
    const imageUrl = CloudinaryResponse.secure_url;

    const discounted_price = discounted_percentage>0 ? (price - price*(discounted_percentage/100)):price;

    
    const productData: ProductType = {
      name,
      category: existingCategory,
      price: parseFloat(price),
      description,
      stock: parseInt(stock, 10),
      imageUrl,
      brandId,
      sellerId,
      discounted_percentage,
      discounted_price,
      petType: existingPet,
    };

    // Create the new product
    const newProduct = await productService.createProduct(productData);
    return res.status(201).json({ data: newProduct });
  } catch (error: any) {
    console.error("Error in createProduct:", error);
    next(error);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const search = (req.query.search as string)?.trim() || "";

  try {
    const { products, total } = await productService.getAllProducts(
      page,
      limit,
      search
    );

    if (!products.length) {
      return Responses.generateSuccessResponse(res, 200, {
        data: [],
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: total,
          totalPages: 0,
        },
      });
    }

    return Responses.generateSuccessResponse(res, 200, {
      data: products,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.query.id as string | null;
    if (!id) {
      throw new ApplicationError(400, "Product ID is required");
    }

    const validationData = await checkRequiredValidation([
      { field: "Product ID", value: id, type: "Empty" },
    ]);

    if (!validationData.status) {
      throw new ApplicationError(400, validationData.message);
    }

    const product = await productService.getProductById(id);

    if (!product) {
      return Responses.generateErrorResponse(res, 404, {
        message: "Product not found",
      });
    }

    return Responses.generateSuccessResponse(res, 200, { data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.query.id as string | null;

    // Validate Product ID
    if (!id) {
      throw new ApplicationError(400, "Product ID is required");
    }

    const validationData = await checkRequiredValidation([
      { field: "Product ID", value: id, type: "Empty" },
    ]);

    if (!validationData.status) {
      throw new ApplicationError(400, validationData.message);
    }

    const existingProduct = await productService.getProductById(id);
    if (!existingProduct) {
      throw new ApplicationError(404, "Product not found");
    }

    const { petType, category } = req.body;

    const existingPet = await PetRepository.findOne({
      where: { name: petType },
    });
    if (!existingPet) {
      throw new ApplicationError(400, "Invalid Pet");
    }

    const existingCategory = await categoryRepository.findOne({
      where: { name: category },
    });
    if (!existingCategory) {
      throw new ApplicationError(400, "Invalid category");
    }

    let imageUrl;
    if (req.file) {
      const CloudinaryResponse = await uploadToCloudinary(req.file, "products");
      imageUrl = CloudinaryResponse.secure_url;
    } else {
      imageUrl = existingProduct.imageUrl;
    }

    const productData: Partial<ProductType> = {
      ...req.body,
      category: existingCategory,
      imageUrl,
      petType: existingPet,
      id: existingProduct.id,
      createdAt: existingProduct.createdAt,
      updatedAt: new Date(),
    };

    const updatedProduct = await productService.updateProduct(
      existingProduct.id,
      productData
    );

    return Responses.generateSuccessResponse(res, 200, {
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.query.id as string | null;

    if (!id) {
      throw new ApplicationError(400, "Product ID is required.");
    }

    const validationData = await checkRequiredValidation([
      { field: "Product ID", value: id, type: "Empty" },
    ]);

    if (!validationData.status) {
      throw new ApplicationError(400, validationData.message);
    }

    const existingProduct = await productService.getProductById(id);

    if (!existingProduct) {
      throw new ApplicationError(404, "Product not found");
    }

    await productService.deleteProduct(id);

    return Responses.generateSuccessResponse(res, 200, {
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const IsFeatured = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.query.id as string | null;

    if (!id) {
      throw new ApplicationError(400, "Product ID is required.");
    }

    const validationData = await checkRequiredValidation([
      { field: "Product ID", value: id, type: "Empty" },
    ]);

    if (!validationData.status) {
      throw new ApplicationError(400, validationData.message);
    }

    const existingProduct = await productService.getProductById(id);

    if (!existingProduct) {
      throw new ApplicationError(404, "Product not found");
    }
    const updatedProduct = await productService.IsFeatured(id);
    if (updatedProduct) {
      return Responses.generateSuccessResponse(res, 200, {
        message: updatedProduct.IsFeatured
          ? "Product successfully featured"
          : "Product removed from featuring section",
        data: updatedProduct,
      });
    } else {
      throw new ApplicationError(500, "Failed to update product status");
    }
  } catch (error) {
    next(error);
  }
};

export const getSellerListedProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req as any;
    let { limit, page_num, search = "" } = req.query;
    const limitOfDocs = limit ? parseInt(limit as string) : 10;
    const skipElements =
      (page_num ? parseInt(page_num as string) - 1 : 0) * limitOfDocs;
    const data = await productService.getListedProducts(
      id,
      skipElements,
      limitOfDocs,
      search as string
    );
    const total_pages =
      (Math.trunc(data.total_products / limitOfDocs) ==
      data.total_products / limitOfDocs
        ? data.total_products / limitOfDocs
        : Math.trunc(data.total_products / limitOfDocs) + 1) || 1;
    return Responses.generateSuccessResponse(res, 200, {
      data: { ...data, current_page: page_num || 1, total_pages },
    });
  } catch (error) {
    next(error);
  }
};
