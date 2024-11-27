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
        phone_num,
        house_num,
        street,
        area,
        landmark,
        pincode,
        city,
        state,
        address_type,
      } = req.body;
      if (
        !street ||
        !landmark ||
        !area ||
        !city ||
        !state ||
        !pincode ||
        !name ||
        !phone_num
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
        phone_num,
        address_type,
      });
      return Responses.generateSuccessResponse(res, 200, { data });
    } catch (error: any) {
      next(error);
    }
  }

  async updateUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req as any;
      const { address_id } = req.query;
      if (!address_id) {
        throw new ApplicationError(
          400,
          "Please Provide Address Id for Update !!"
        );
      }
      const {
        name = null,
        phone_num = null,
        house_num = null,
        street = null,
        area = null,
        landmark = null,
        pincode = null,
        city = null,
        state = null,
        address_type = null,
      } = req.body;

      const data_to_update: any = {};
      if (name) {
        data_to_update.name = name;
      }

      if (phone_num) {
        data_to_update.phone_num = phone_num;
      }

      if (house_num) {
        data_to_update.house_num = house_num;
      }

      if (street) {
        data_to_update.street = street;
      }

      if (area) {
        data_to_update.area = area;
      }

      if (landmark) {
        data_to_update.landmark = landmark;
      }

      if (pincode) {
        data_to_update.pincode = pincode;
      }

      if (city) {
        data_to_update.city = city;
      }

      if (state) {
        data_to_update.state = state;
      }

      if (address_type) {
        data_to_update.address_type = address_type;
      }

      if (!Object.keys(data_to_update).length) {
        throw new ApplicationError(
          400,
          "At Least One field is Required for Update !!"
        );
      }

      data_to_update.id = address_id as string;
      await addressService.updateAddress(id, { ...data_to_update });
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
