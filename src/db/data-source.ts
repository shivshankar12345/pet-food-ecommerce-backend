import { DataSource } from "typeorm";
import { User } from "../entity/user.entity";
// import { Otp } from "../entity/otp.entity";
// import { Product } from "../entity/product.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string) || 4000,
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DATABASE || "",
  connectorPackage: "mysql2",
  entities: [User],
  //  Otp],

  synchronize: true,
  logging: false,
});

console.log(process.env.DB_USERNAME, process.env.DB_PASSWORD);
export const connectToDb = async () => {
  try {
    await AppDataSource.initialize();
    console.log(`Database is Successfully Connected !!`);
  } catch (error: any) {
    console.log(error);
  }
};
