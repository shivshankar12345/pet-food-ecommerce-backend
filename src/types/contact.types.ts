export type ContactType = "Phone" | "Email";

export type ContactObject = {
  contact_type: ContactType;
  contact: string;
};

export type ContactObjectOption = {
  contact_type?: ContactType;
  contact?: string;
};
