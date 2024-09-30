import { DataSource } from "typeorm";
import { User } from "../entity/user.entity";
import { Product } from "../entity/product.entity";
import { Token } from "../entity/token.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string) || 4000,
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DATABASE || "",
  connectorPackage: "mysql2",
  entities: [User, Token, Product],
  synchronize: false,
});

export const connectToDb = async () => {
  try {
    await AppDataSource.initialize();
    console.log(`Database is Successfully Connected !!`);
  } catch (error: any) {
    console.log(error);
  }
};
