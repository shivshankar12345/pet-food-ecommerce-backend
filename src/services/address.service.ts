import { Address } from "../types/address.types";
import { userRepository } from "../repository/user.repository";
import ApplicationError from "../error/ApplicationError";
import { addressRepository } from "../repository/address.repository";

export default class AddressService {
  private async getUser(id: string) {
    try {
      const user = await userRepository.findOne({ where: { id } });
      if (!user) {
        throw new ApplicationError(404, "User not found !!");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createAddress(user_id: string, address: Address) {
    try {
      const user = await this.getUser(user_id);
      (address as any).user_id = user;
      const data = userRepository.create(address);
      await addressRepository.save(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteAddress(user_id: string, id: string) {
    try {
      const user = await this.getUser(user_id);
      const address = await addressRepository.findOne({
        where: { user_id: user, id },
      });
      if (!address) {
        throw new ApplicationError(404, "Address not found !!");
      }
      await addressRepository.remove(address);
    } catch (error: any) {
      throw error;
    }
  }

  async updateAddress(user_id: string, address: Address & { id: string }) {
    try {
      const user = await this.getUser(user_id);
      const data = await addressRepository.findOne({
        where: { user_id: user, id: address?.id },
      });
      if (!data) {
        throw new ApplicationError(404, "Address not found !");
      }
      Object.assign(data, address);
      await addressRepository.save(data);
    } catch (error) {
      throw error;
    }
  }

  async getAddresses(user_id: string) {
    try {
      const user = await this.getUser(user_id);
      const addresses = await addressRepository.find({
        where: { user_id: user },
        relations: { user_id: true },
      });
      return addresses;
    } catch (error) {
      throw error;
    }
  }
}
