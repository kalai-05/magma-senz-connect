import { Router } from "express";
import { z } from "zod";
import admin from "../config/firebase.js";
import { UserModel } from "../models/User.js";

const router = Router();

const authSchema = z.object({
  name: z.string().min(1),
  email: z.string().email()
});

router.post("/me", async (req, res) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Missing Authorization header" });
  }
  const token = header.replace("Bearer ", "");
  const decoded = await admin.auth().verifyIdToken(token);
  const body = authSchema.parse(req.body);

  const user = await UserModel.findOneAndUpdate(
    { uid: decoded.uid },
    {
      $set: {
        uid: decoded.uid,
        name: body.name,
        email: body.email
      }
    },
    { upsert: true, new: true }
  );

  return res.json(user);
});

export default router;
