import mongoose from "mongoose";

type UserOtpType = {
  email: string;
  otp: string;
  expiresAt: number;
};

const userOtpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

const UserOtp =
  (mongoose.models.UserOtps as mongoose.Model<UserOtpType>) ||
  mongoose.model<UserOtpType>("UserOtps", userOtpSchema);

export default UserOtp;
