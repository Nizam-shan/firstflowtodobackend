import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
