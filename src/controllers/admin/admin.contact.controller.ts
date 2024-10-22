import { NextFunction, Request, Response } from "express";
import AdminContactManageService from "../../services/admin/admin.contact.service";
import ApplicationError from "../../error/ApplicationError";
import Responses from "../../modules/responses";

const adminContactService = new AdminContactManageService();

export default class AdminContactManageController {
  async getContact(req: Request, res: Response, next: NextFunction) {
    try {
      const { contact_type } = req.query;
      if (contact_type != "Phone" && contact_type != "Email") {
        throw new ApplicationError(400, "Incorrect Contact Type");
      }
      const contacts = await adminContactService.getContact(contact_type);
      return Responses.generateSuccessResponse(res, 200, { contacts });
    } catch (error) {
      next(error);
    }
  }

  async addContact(req: Request, res: Response, next: NextFunction) {
    try {
      const { contact_type, contact } = req.body;
      if (!contact || !contact_type) {
        throw new ApplicationError(400, "Please Provide Required Details");
      }

      if (contact_type != "Phone" && contact_type != "Email") {
        throw new ApplicationError(400, "Incorrect Contact Type");
      }
      await adminContactService.addContact({ contact_type, contact });
      return Responses.generateSuccessResponse(res, 201, {
        message: "Contact Added Successfully !!",
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const contacts = await adminContactService.getAll();
      return Responses.generateSuccessResponse(res, 200, { contacts });
    } catch (error) {
      next(error);
    }
  }

  async updateContact(req: Request, res: Response, next: NextFunction) {
    try {
      const { id = null, contact_type = null, contact = null } = req.body;
      if (!id) {
        throw new ApplicationError(400, "Please Provide Required fields");
      }

      const updateObject = {};
      if (contact_type) {
        Object.assign(updateObject, { contact_type });
      }

      if (contact) {
        Object.assign(updateObject, { contact });
      }

      if (!Object.keys(updateObject).length) {
        throw new ApplicationError(
          400,
          "Atleast One field is Required to Update !"
        );
      }

      await adminContactService.updateContact(updateObject, id);
      return Responses.generateSuccessResponse(res, 200, {
        message: "Contact Updated Successfully !!",
      });
    } catch (error) {
      next(error);
    }
  }
}
