import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Crousel")
export class Crousel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  imageUrl: string;
}
