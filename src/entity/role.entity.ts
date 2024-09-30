import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Permission } from "./permission.entity";

@Entity("Role")
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: ["customer", "seller", "admin"],
    enumName: "role_name",
  })
  role_name: string;

  @OneToOne(() => Permission)
  @JoinColumn()
  permission: Permission;
}
