import { Category, PetType } from "../utils/enum";

export interface Product {
  id?: number;
  name: string;
  categoryId: Category;
  price: number;
  description?: string;
  stock: number;
  imageUrl: string;
  brandId?: number;
  sellerId: number;
  petType?: PetType;
  createdAt?: Date; 
  updatedAt?: Date; 
}
