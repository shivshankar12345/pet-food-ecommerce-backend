import { AppDataSource } from "../db/data-source";

import { Address } from "../entity/address.entity";

export const addressRepository = AppDataSource.getRepository(Address);
