import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ["buyer", "farmer", "ccr", "admin"],
      default: "buyer"
    },
    status: {
      type: String,
      enum: ["active", "disabled"],
      default: "active"
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const UserModel = mongoose.model("User", userSchema);
