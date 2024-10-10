import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Permission")
export class Permission {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: ["limited", "moderate", "full"],
    enumName: "permission",
    unique: true,
  })
  permission: string;
}
