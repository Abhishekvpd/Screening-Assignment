import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  interest: String,
});

const Interest =
  (mongoose.models.Interests as mongoose.Model<{ interest: string }>) ||
  mongoose.model<{ interest: string }>("Interests", userSchema);

export default Interest;
