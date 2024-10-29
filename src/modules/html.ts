export const getOtpHtml = (otp: string) => `  <div
    style="
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    "
  >
    <div
      style="
        width: 100%;
        max-width: 400px;
        margin: 50px auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
      "
    >
      <h1 style="color: #4a90e2">SuperTails</h1>
      <h2 style="margin: 10px 0">OTP Verification</h2>
      <p
        style="
          margin: 15px 0;
          font-weight: bold;
          font-size: 20px;
          color: #d9534f;
        "
      >
        Your OTP for Verification : <span id="otp-code">${otp}</span>
      </p>

      <div style="margin-top: 20px; font-size: 14px; color: #777">
        © 2024 SuperTails. All rights reserved.
      </div>
    </div>
  </div>
`;

export const userQueryAdminHtml = (
  name: string,
  email: string,
  message: string
) =>
  `  <div
    style="
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    "
  >
    <div
      style="
        width: 100%;
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      "
    >
      <h1 style="color: #4a90e2; text-align: center">Connect to SuperTails</h1>
      <p style="color: #555">Hello ,</p>
      <p style="color: #555">
        A new query has been raised by a user. Here are the details:
      </p>

      <p style="font-weight: bold">
        Name: <span style="color: #555">${name}</span>
      </p>
      <p style="font-weight: bold">
        Email: <span style="color: #555">${email}</span>
      </p>
      <p style="font-weight: bold">Message:</p>
      <p style="color: #555">
        ${message}
      </p>

      <p style="color: #555">
        Please address this query at your earliest convenience.
      </p>

      <div style="margin-top: 20px">
        <p style="color: #777">Best regards,<br />Team SuperTails</p>
      </div>

      <div
        style="
          margin-top: 20px;
          font-size: 14px;
          color: #777;
          text-align: center;
        "
      >
        © 2024 SuperTails. All rights reserved.
      </div>
    </div>
  </div>`;

export const userQueryHtml = (name: string) => `  <div
    style="
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    "
  >
    <div
      style="
        width: 100%;
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      "
    >
      <h1 style="color: #4a90e2; text-align: center">Connect to SuperTails</h1>

      <h2 style="color: #333">Dear ${name},</h2>
      <p style="color: #555">Thank you for reaching out to us!</p>
      <p style="color: #555">
        We want to inform you that your query has been registered with us, and
        one of our executives will connect with you shortly.
      </p>

      <p style="color: #555">
        If you have any further questions, feel free to reply to this email.
      </p>

      <div style="margin-top: 25px">
        <p style="color: #777">Best regards,<br />Team SuperTails</p>
      </div>

      <div
        style="
          margin-top: 20px;
          font-size: 14px;
          color: #777;
          text-align: center;
        "
      >
        © 2024 SuperTails. All rights reserved.
      </div>
    </div>
  </div>`;

export const userSellerRequest = (name: string) =>
  `<div
      style="
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      "
    >
      <div
        style="
          width: 100%;
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        "
      >
        <h1 style="color: #4a90e2; text-align: center">
          Seller Partnership Request
        </h1>

        <h2 style="color: #333">Dear ${name},</h2>
        <p style="color: #555">
          Thank you for your interest in becoming a Seller Partner with us!
        </p>

        <p style="color: #555">
          We have successfully registered your request. Our team is currently
          working hard to verify the documents you have submited.
        </p>

        <p style="color: #555">
          Once everything is verified, we will activate your seller account.
          Until then, feel free to explore our products and services!
        </p>

        <div style="margin-top: 25px">
          <p style="color: #777">Best regards,<br />Team SuperTails</p>
        </div>

        <div
          style="
            margin-top: 20px;
            font-size: 14px;
            color: #777;
            text-align: center;
          "
        >
          © 2024 SuperTails. All rights reserved.
        </div>
      </div>
    </div>`;
