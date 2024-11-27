enum AddressType {
  HOME = "home",
  WORK = "work",
}

export type Address = {
  house_num?: string | undefined;
  street: string;
  landmark: string;
  area: string;
  pincode: string;
  city: string;
  state: string;
  name: string;
  phone_num: string;
  address_type: AddressType;
};

export type AddressOptional = Address;
