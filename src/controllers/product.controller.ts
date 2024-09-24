import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { Product as ProductType } from "../types/product.types";
import ApplicationError from "../error/ApplicationError";

const productService = new ProductService();

export class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      const {
        name,
        categoryId,
        price,
        description,
        stock,
        brandId,
        sellerId,
        pet_type,
      } = req.body; 
      const image_url = req.file?.path;

      const productData: Partial<ProductType> = {
        name,
        categoryId: parseInt(categoryId),
        price: parseFloat(price),
        description,
        stock: parseInt(stock),
        image_url,
        brandId: parseInt(brandId),
        sellerId: parseInt(sellerId),
        pet_type, 
      };

      const newProduct = await productService.createProduct(productData);
      return res.status(201).json(newProduct);
    } catch (error) {
      if (error instanceof ApplicationError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts();
      return res.status(200).json(products);
    } catch (error) {
      if (error instanceof ApplicationError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(parseInt(id));
      return res.status(200).json(product);
    } catch (error) {
      if (error instanceof ApplicationError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const productData: Partial<ProductType> = req.body;
      if (req.file) {
        productData.image_url = req.file.path;
      }
      const updatedProduct = await productService.updateProduct(
        parseInt(id),
        productData
      );
      return res.status(200).json(updatedProduct);
    } catch (error) {
      if (error instanceof ApplicationError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await productService.deleteProduct(parseInt(id));
      return res.status(204).send();
    } catch (error) {
      if (error instanceof ApplicationError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
