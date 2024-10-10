import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { PetType } from "../utils/enum";
import { Category } from "./category.entity";

@Entity("Products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Category, category => category.products)
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
  brand: string;

  @Column({ name: "seller_id" })
  sellerId: number;

  @Column({ type: "enum", enum: PetType, nullable: true })
  petType: PetType;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}
