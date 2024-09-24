import { AppDataSource } from "../db/data-source";
import { Product } from "../entity/product.entity";
import { Product as ProductType } from "../types/product.types";
import ApplicationError from "../error/ApplicationError";

export class ProductService {
  private productRepository = AppDataSource.getRepository(Product);

  async createProduct(productData: Partial<ProductType>): Promise<Product> {
    try {
      const product = this.productRepository.create(productData);
      return await this.productRepository.save(product);
    } catch (error) {
      throw new ApplicationError(500, "Error creating product");
    }
  }

  async getAllProducts(): Promise<Product[]> { 
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw new ApplicationError(500, "Error fetching products");
    }
  }

  async getProductById(id: number): Promise<Product> { 
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        throw new ApplicationError(404, "Product not found");
      }
      return product;
    } catch (error) {
      throw new ApplicationError(500, "Error fetching product");
    }
  }

  async updateProduct(id: number, productData: Partial<ProductType>): Promise<Product> {
    try {
      await this.getProductById(id); 
      await this.productRepository.update(id, productData);
      return await this.getProductById(id); 
    } catch (error) {
      throw new ApplicationError(500, "Error updating product");
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      await this.getProductById(id); 
      await this.productRepository.delete(id);
    } catch (error) {
      throw new ApplicationError(500, "Error deleting product");
    }
  }
}
