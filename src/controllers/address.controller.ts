import { NextFunction, Request, Response } from "express";
import AddressService from "../services/address.service";
import Responses from "../modules/responses";
import ApplicationError from "../error/ApplicationError";

const addressService = new AddressService();

export default class AddressController {
  async getUserAddresses(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req as any;
      const addresses = await addressService.getAddresses(id);
      return Responses.generateSuccessResponse(res, 200, { addresses });
    } catch (error: any) {
      next(error);
    }
  }
  async createUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req as any;
      const {
        name,
        phone,
        house_num,
        street,
        area,
        landmark,
        pincode,
        city,
        state,
      } = req.body;
      if (
        !street ||
        !landmark ||
        !area ||
        !city ||
        !state ||
        !pincode ||
        !name ||
        !phone
      ) {
        throw new ApplicationError(400, "Please Provide Required Details !!");
      }
      const data = await addressService.createAddress(id, {
        house_num,
        street,
        area,
        pincode,
        landmark,
        city,
        state,
        name,
        phone,
      });
      return Responses.generateSuccessResponse(res, 200, { data });
    } catch (error: any) {
      next(error);
    }
  }
  async updateUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req as any;
      const {} = req.body;
      await addressService;
      return Responses.generateSuccessResponse(res, 200, {
        message: "Address Update Successfully !!",
      });
    } catch (error: any) {
      next(error);
    }
  }
  async deleteUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req as any;
      const { address_id } = req.query;
      if (!address_id) {
        throw new ApplicationError(400, "Please Provide Address Id");
      }
      await addressService.deleteAddress(id, address_id as string);
      return Responses.generateSuccessResponse(res, 200, {
        message: "User Deleted Successfully !!",
      });
    } catch (error: any) {
      next(error);
    }
  }
}
