import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import UserOtp from "~/models/userOtpModel";

export const sendEmail = async (email: string) => {
  try {
    const otp = `${Math.floor(Math.random() * 90000000 + 10000000)}`;
    const hashedOtp = await bcryptjs.hash(otp.toString(), 10);

    const userOtpVerification = new UserOtp({
      email: email,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 300000,
    });

    await userOtpVerification.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
      },
    });

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify OTP",
      html: `<p>Hello,
        <br/>
        Your code for authentication is: ${otp}, code is valid for only 5 minutes.
        <br/>
        If you didn't request this code, please ignore this email.`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
