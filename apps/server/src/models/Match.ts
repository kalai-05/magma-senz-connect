import mongoose, { Schema } from "mongoose";

const matchSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    demandId: { type: Schema.Types.ObjectId, ref: "Demand", required: true },
    score: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    ccrId: { type: Schema.Types.ObjectId, ref: "User" },
    note: { type: String }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

matchSchema.index({ productId: 1, demandId: 1 }, { unique: true });

export const MatchModel = mongoose.model("Match", matchSchema);
