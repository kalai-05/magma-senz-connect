import { NextFunction, Request, Response } from "express";
import admin from "../config/firebase.js";
import { UserModel } from "../models/User.js";

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    role: string;
    status: string;
    userId: string;
  };
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Missing Authorization header" });
    }
    const token = header.replace("Bearer ", "");
    const decoded = await admin.auth().verifyIdToken(token);
    const user = await UserModel.findOne({ uid: decoded.uid });
    if (!user) {
      return res.status(403).json({ message: "User profile not found" });
    }
    if (user.status === "disabled") {
      return res.status(403).json({ message: "User is disabled" });
    }
    req.user = {
      uid: decoded.uid,
      role: user.role,
      status: user.status,
      userId: user._id.toString()
    };
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
