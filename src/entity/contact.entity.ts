import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Contact")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: ["Phone", "Email"],
    nullable: false,
  })
  contact_type: string;

  @Column({ nullable: false, unique: true })
  contact: string;
}
