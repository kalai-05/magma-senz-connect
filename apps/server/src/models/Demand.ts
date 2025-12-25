import mongoose, { Schema } from "mongoose";

const demandSchema = new Schema(
  {
    buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    qty: { type: Number, required: true },
    unit: { type: String, required: true },
    budgetMin: { type: Number, required: true },
    budgetMax: { type: Number, required: true },
    location: { type: String, required: true },
    neededDate: { type: String },
    status: { type: String, enum: ["active", "closed"], default: "active" }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const DemandModel = mongoose.model("Demand", demandSchema);
