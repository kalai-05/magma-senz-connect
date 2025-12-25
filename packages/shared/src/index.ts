import { z } from "zod";

export type UserRole = "buyer" | "farmer" | "ccr" | "admin";
export type UserStatus = "active" | "disabled";

export type MatchStatus = "pending" | "approved" | "rejected";

export const productSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  qty: z.number().positive(),
  unit: z.string().min(1),
  priceMin: z.number().nonnegative(),
  priceMax: z.number().nonnegative(),
  location: z.string().min(1),
  images: z.array(z.string().url()).optional().default([]),
  status: z.enum(["active", "inactive"]).default("active")
});

export const demandSchema = z.object({
  category: z.string().min(1),
  description: z.string().min(1),
  qty: z.number().positive(),
  unit: z.string().min(1),
  budgetMin: z.number().nonnegative(),
  budgetMax: z.number().nonnegative(),
  location: z.string().min(1),
  neededDate: z.string().optional(),
  status: z.enum(["active", "closed"]).default("active")
});

export const roleSchema = z.enum(["buyer", "farmer", "ccr", "admin"]);
export const statusSchema = z.enum(["active", "disabled"]);
