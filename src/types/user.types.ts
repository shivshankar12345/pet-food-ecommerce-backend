export type SaveUserParams = {
  email: string;
};

export type UpdateUser = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  pan_num?: string;
  gst_num?: string;
  gender?: string;
};
