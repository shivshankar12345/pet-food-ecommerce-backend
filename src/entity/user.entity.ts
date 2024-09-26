import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ default: "customer" })
  role_id: string;

  @Column({ nullable: true })
  pan_num: string;

  @Column({ nullable: true })
  rating: number;

  @Column({ nullable: true })
  gst_num: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;

  @Column({ type: "timestamp", default: null })
  updated_at: string;
}
