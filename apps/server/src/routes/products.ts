import { Router } from "express";
import { productSchema } from "@senz/shared";
import { ProductModel } from "../models/Product.js";
import { requireRole } from "../middleware/rbac.js";
import { AuthRequest } from "../middleware/auth.js";
import { recomputeForProduct } from "../utils/matching.js";

const router = Router();

router.post("/", requireRole(["farmer"]), async (req: AuthRequest, res) => {
  const data = productSchema.parse(req.body);
  const product = await ProductModel.create({
    ...data,
    farmerId: req.user?.userId
  });
  await recomputeForProduct(product._id.toString());
  res.status(201).json(product);
});

router.get("/mine", requireRole(["farmer"]), async (req: AuthRequest, res) => {
  const products = await ProductModel.find({ farmerId: req.user?.userId });
  res.json(products);
});

router.get(
  "/public",
  requireRole(["buyer", "ccr", "admin"]),
  async (_req, res) => {
    const products = await ProductModel.find({ status: "active" });
    res.json(products);
  }
);

router.patch("/:id", requireRole(["farmer", "admin"]), async (req, res) => {
  const data = productSchema.partial().parse(req.body);
  const product = await ProductModel.findByIdAndUpdate(req.params.id, data, {
    new: true
  });
  if (product) {
    await recomputeForProduct(product._id.toString());
  }
  res.json(product);
});

export default router;
