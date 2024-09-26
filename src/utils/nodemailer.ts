import nodemailer from "nodemailer";

//* Configure Nodemailer Setting
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

//* Send Mail using Transporter
const sendMail = async (email: string, otp: string): Promise<void> => {
  try {
    const mailOptions = {
      from: "Shahnawaaz Ansari <shaan.ansari1901@gmail.com>",
      to: email,
      text: `OTP for Login is : ${otp}`,
      subject: "no reply",
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

export default sendMail;
