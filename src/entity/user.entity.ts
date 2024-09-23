import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, length: 10 })
  phone: string;

  @Column("enum")
  gender: "m" | "f" | "o";

  @Column()
  role_id: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  pan_num: string;

  @Column({ nullable: true })
  rating: number;

  @Column({ nullable: true })
  gst_num: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}
