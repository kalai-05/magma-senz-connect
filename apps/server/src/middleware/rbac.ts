import { NextFunction, Response } from "express";
import { AuthRequest } from "./auth.js";
import { UserRole } from "@senz/shared";

export const requireRole = (roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const role = req.user?.role as UserRole | undefined;
    if (!role || !roles.includes(role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    return next();
  };
};
