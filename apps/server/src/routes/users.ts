import { Router } from "express";
import { z } from "zod";
import { UserModel } from "../models/User.js";
import { requireRole } from "../middleware/rbac.js";
import { roleSchema, statusSchema } from "@senz/shared";

const router = Router();

router.get("/", requireRole(["admin"]), async (_req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

router.patch("/:id/role", requireRole(["admin"]), async (req, res) => {
  const schema = z.object({ role: roleSchema });
  const { role } = schema.parse(req.body);
  const user = await UserModel.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  );
  res.json(user);
});

router.patch("/:id/status", requireRole(["admin"]), async (req, res) => {
  const schema = z.object({ status: statusSchema });
  const { status } = schema.parse(req.body);
  const user = await UserModel.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(user);
});

export default router;
