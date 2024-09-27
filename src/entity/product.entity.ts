import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category, PetType } from "../utils/enum";

@Entity("Products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "enum", enum: Category })
  categoryId: Category;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column()
  stock: number;

  @Column({ name: "image_url", nullable: false })
  imageUrl: string;

  @Column({ name: "brand_id", nullable: true })
  brandId: number;

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
