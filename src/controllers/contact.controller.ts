import { NextFunction, Request, Response } from "express";
import ContactService from "../services/contact.service";
import ApplicationError from "../error/ApplicationError";
import Responses from "../modules/responses";
import { userQueryAdminHtml, userQueryHtml } from "../modules/html";
import sendMail from "../utils/nodemailer";

const contactService = new ContactService();

export default class ContactController {
  async getContact(req: Request, res: Response, next: NextFunction) {
    try {
      const { contact_type } = req.query;
      if (contact_type != "Phone" && contact_type != "Email") {
        throw new ApplicationError(400, "Incorrect Contact Type");
      }
      const contacts = await contactService.getContact(contact_type);
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
      await contactService.addContact({ contact_type, contact });
      return Responses.generateSuccessResponse(res, 201, {
        message: "Contact Added Successfully !!",
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const contacts = await contactService.getAll();
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

      await contactService.updateContact(updateObject, id);
      return Responses.generateSuccessResponse(res, 200, {
        message: "Contact Updated Successfully !!",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteContact(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;
      if (!id) {
        throw new ApplicationError(400, "Please Provide Required fields !!");
      }

      await contactService.deleteContact(id as string);
      return Responses.generateSuccessResponse(res, 200, {
        message: "Contact Deleted Successfully !!",
      });
    } catch (error) {
      next(error);
    }
  }

  async connectWithUs(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        throw new ApplicationError(400, "Please Provide Required fields !!");
      }
      sendMail(
        email,
        "SuperTails - Query Registration Confirmation",
        "",
        userQueryHtml(name)
      );
      sendMail(
        "learningphase08@gmail.com",
        `SuperTails - New Query Notification`,
        "",
        userQueryAdminHtml(name, email, message)
      );
      return Responses.generateSuccessResponse(res, 200, {
        message: "Connected Successfully !!",
      });
    } catch (error) {
      next(error);
    }
  }
}
