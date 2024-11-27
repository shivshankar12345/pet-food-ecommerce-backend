import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Role } from "./role.entity";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: null })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, length: 10, default: null })
  phone: string;

  @Column({ type: "enum", enum: ["m", "f", "o"], default: null })
  gender: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: "role_id" })
  role: Role;

  @Column({ nullable: true })
  pan_num: string;

  @Column({ nullable: true })
  rating: number;

  @Column({ nullable: true })
  gst_num: string;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  token: string;

  @Column({ type: "timestamp", default: null })
  deleted_at: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;

  @Column({ type: "timestamp", default: null })
  updated_at: string;
    orders: any;
}
