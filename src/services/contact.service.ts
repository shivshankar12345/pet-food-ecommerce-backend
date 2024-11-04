import ApplicationError from "../error/ApplicationError";
import { QueryFailedError } from "typeorm";
import { contactRepository } from "../repository/contact.repository";
import {
  ContactObject,
  ContactObjectOption,
  ContactType,
} from "../types/contact.types";
export default class ContactService {
  async getContact(contact_type: ContactType) {
    try {
      const contact = await contactRepository.find({ where: { contact_type } });
      return contact;
    } catch (error) {
      throw error;
    }
  }
  async addContact(contactObject: ContactObject) {
    try {
      const newContact = await contactRepository.save(contactObject);
      return newContact;
    } catch (error: any) {
      if (
        error instanceof QueryFailedError &&
        error?.driverError?.message?.includes("Duplicate entry")
      ) {
        throw new ApplicationError(400, "Contact Already Exists ");
      }
      throw error;
    }
  }

  async getAll() {
    try {
      const contacts = await contactRepository.find();
      return contacts;
    } catch (error) {
      throw error;
    }
  }

  async updateContact(updateObject: ContactObjectOption, id: string) {
    try {
      const contactData = await contactRepository.findOne({ where: { id } });
      if (!contactData) {
        throw new ApplicationError(400, "Incorrect Contact Id");
      }
      Object.assign(contactData, updateObject);
      await contactRepository.save(contactData);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error?.driverError?.message?.includes("Duplicate entry")
      ) {
        throw new ApplicationError(400, "Contact Already Exists ");
      }
      throw error;
    }
  }

  async deleteContact(id: string) {
    try {
      const contact = await contactRepository.findOne({ where: { id } });
      if (!contact) {
        throw new ApplicationError(404, "Contact not found");
      }
      await contactRepository.remove(contact);
    } catch (error) {
      throw error;
    }
  }
}
