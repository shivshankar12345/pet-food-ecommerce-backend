import { DataSource } from "typeorm";
import { User } from "../entity/user.entity";
import { Product } from "../entity/product.entity";
import { Token } from "../entity/token.entity";
import { Permission } from "../entity/permission.entity";
import { Role } from "../entity/role.entity";
import { Category } from "../entity/category.entity";
import { Contact } from "../entity/contact.entity";
import { Crousel } from "../entity/crousel.entity";
import { Pet } from "../entity/pet.entity";
import dotenv from "dotenv";
import { Cart } from "../entity/cart.entity";
dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DATABASE } = process.env;
export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: DB_PORT ? parseInt(DB_PORT as string) : 4000,
  username: DB_USERNAME || "",
  password: DB_PASSWORD || "",
  database: DATABASE || "",
  connectorPackage: "mysql2",
  connectTimeout: 10000,
  entities: [
    Permission,
    Role,
    User,
    Token,
    Product,
    Category,
    Contact,
    Crousel,
    Pet,
    Cart,
  ],
  synchronize: false,
  migrations: ["./src/migrations/**/*.ts"],
});

export const connectToDb = async () => {
  try {
    await AppDataSource.initialize();
    console.log(`Database is Successfully Connected !!`);
  } catch (error: any) {
    console.log(error);
  }
};
