/* Repository */
export type ValidateOtpArgs = {
  id: string;
  email: string;
  otp: string;
};

export type OTP = {
  id: string;
  email: string;
  otp: string;
  created_at: Date;
};
