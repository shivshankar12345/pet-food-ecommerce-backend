export const generateOtp = (): string => {
  let otp: string | string[] = Math.ceil(Math.random() * 1000000).toString();
  if (otp.length < 6) {
    otp = otp.split("");
    otp.unshift("0");
    otp = otp.join("");
  }
  return otp;
};
