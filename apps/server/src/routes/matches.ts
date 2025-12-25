import { Router } from "express";
import { z } from "zod";
import { MatchModel } from "../models/Match.js";
import { requireRole } from "../middleware/rbac.js";
import { AuthRequest } from "../middleware/auth.js";
import { recomputeMatches } from "../utils/matching.js";

const router = Router();

router.get(
  "/pending",
  requireRole(["ccr", "admin"]),
  async (_req, res) => {
    const matches = await MatchModel.find({ status: "pending" })
      .populate("productId")
      .populate("demandId");
    res.json(matches);
  }
);

router.get("/mine", requireRole(["buyer", "farmer"]), async (req: AuthRequest, res) => {
  const userId = req.user?.userId;
  const matches = await MatchModel.find({ status: "approved" })
    .populate("productId")
    .populate("demandId");

  const filtered = matches.filter((match: any) => {
    const product = match.productId as any;
    const demand = match.demandId as any;
    return product?.farmerId?.toString() === userId || demand?.buyerId?.toString() === userId;
  });

  res.json(filtered);
});

router.patch(
  "/:id/approve",
  requireRole(["ccr", "admin"]),
  async (req: AuthRequest, res) => {
    const schema = z.object({ note: z.string().optional() });
    const { note } = schema.parse(req.body);
    const match = await MatchModel.findByIdAndUpdate(
      req.params.id,
      {
        status: "approved",
        note,
        ccrId: req.user?.userId
      },
      { new: true }
    );
    res.json(match);
  }
);

router.patch(
  "/:id/reject",
  requireRole(["ccr", "admin"]),
  async (req: AuthRequest, res) => {
    const schema = z.object({ note: z.string().optional() });
    const { note } = schema.parse(req.body);
    const match = await MatchModel.findByIdAndUpdate(
      req.params.id,
      {
        status: "rejected",
        note,
        ccrId: req.user?.userId
      },
      { new: true }
    );
    res.json(match);
  }
);

router.post(
  "/recompute",
  requireRole(["ccr", "admin"]),
  async (_req, res) => {
    await recomputeMatches();
    res.json({ status: "ok" });
  }
);

export default router;
