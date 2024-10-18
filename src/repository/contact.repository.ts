import { AppDataSource } from "../db/data-source";
import { Contact } from "../entity/contact.entity";

export const contactRepository = AppDataSource.getRepository(Contact);
