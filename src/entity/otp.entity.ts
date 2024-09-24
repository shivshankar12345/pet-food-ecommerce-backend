import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity("Otp")
export class Otp {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  otp: string;

  @Column()
  email: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
