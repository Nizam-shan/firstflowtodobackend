import { Schema, model } from "mongoose";

const FirstSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    descriptions: { type: String, required: true, default: "" },
    status: { type: String, default: "pending" },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model("Crud", FirstSchema);
