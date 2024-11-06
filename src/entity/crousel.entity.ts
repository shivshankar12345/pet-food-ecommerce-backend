import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Crousel")
export class Crousel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, unique: true })
  imageUrl: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  priority: number;
}
