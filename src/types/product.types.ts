import { Category } from "../entity/category.entity";

import { Pet } from "../entity/pet.entity";

export interface Product {
  id?: string;
  name: string;
  category: Category;
  price: number;
  description?: string;
  stock: number;
  imageUrl: string;
  brandId?: string;
  sellerId: string;
  petType: Pet;
  createdAt?: Date;
  updatedAt?: Date;
  IsFeatured?:boolean;
}
