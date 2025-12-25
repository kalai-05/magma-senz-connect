import { Router } from "express";
import { demandSchema } from "@senz/shared";
import { DemandModel } from "../models/Demand.js";
import { requireRole } from "../middleware/rbac.js";
import { AuthRequest } from "../middleware/auth.js";
import { recomputeForDemand } from "../utils/matching.js";

const router = Router();

router.post("/", requireRole(["buyer"]), async (req: AuthRequest, res) => {
  const data = demandSchema.parse(req.body);
  const demand = await DemandModel.create({
    ...data,
    buyerId: req.user?.userId
  });
  await recomputeForDemand(demand._id.toString());
  res.status(201).json(demand);
});

router.get("/mine", requireRole(["buyer"]), async (req: AuthRequest, res) => {
  const demands = await DemandModel.find({ buyerId: req.user?.userId });
  res.json(demands);
});

router.get("/all", requireRole(["ccr", "admin"]), async (_req, res) => {
  const demands = await DemandModel.find();
  res.json(demands);
});

router.patch("/:id", requireRole(["buyer", "admin"]), async (req, res) => {
  const data = demandSchema.partial().parse(req.body);
  const demand = await DemandModel.findByIdAndUpdate(req.params.id, data, {
    new: true
  });
  if (demand) {
    await recomputeForDemand(demand._id.toString());
  }
  res.json(demand);
});

export default router;
