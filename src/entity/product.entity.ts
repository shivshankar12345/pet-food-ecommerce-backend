import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Category } from "./category.entity";
import { Pet } from "./pet.entity";

@Entity("Products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column()
  stock: number;

  @Column({ name: "image_url", nullable: false })
  imageUrl: string;

  @Column({ name: "brand_id", nullable: true })
  brandId: string;

  @Column({ name: "seller_id" })
  sellerId: string;

  @Column({ name: "discounted_price", type: "decimal", precision: 10, scale: 2})
  discounted_price: number;

  @Column({ name: "discounted_percentage", type: "decimal", precision: 5, scale: 2, default: 0 })
  discounted_percentage: number;

  @ManyToOne(() => Pet,pet => pet.products)
  @JoinColumn({ name: "PetType" })
  petType: Pet;

  @Column({ default: false })
  IsFeatured: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}
