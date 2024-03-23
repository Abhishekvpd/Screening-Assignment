import mongoose from "mongoose";

export type UserType = {
  username: string;
  email: string;
  password: string;
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otpExpiry: Date
});

const User =
  (mongoose.models.Users as mongoose.Model<UserType>) ||
  mongoose.model<UserType>("Users", userSchema);

export default User;
