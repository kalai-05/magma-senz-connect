import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    farmerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    qty: { type: Number, required: true },
    unit: { type: String, required: true },
    priceMin: { type: Number, required: true },
    priceMax: { type: Number, required: true },
    location: { type: String, required: true },
    images: [{ type: String }],
    status: { type: String, enum: ["active", "inactive"], default: "active" }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const ProductModel = mongoose.model("Product", productSchema);
