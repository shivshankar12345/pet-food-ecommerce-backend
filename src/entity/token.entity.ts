import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Token")
export class Token {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  token: string;
}
