import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import productsRoutes from "./routes/products.js";
import demandsRoutes from "./routes/demands.js";
import matchesRoutes from "./routes/matches.js";
import { errorHandler } from "./middleware/error.js";
import { requireAuth } from "./middleware/auth.js";

const app = express();

const origins = process.env.CORS_ORIGINS?.split(",").map((origin) => origin.trim());

app.use(express.json());
app.use(
  cors({
    origin: origins,
    credentials: true
  })
);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", requireAuth, usersRoutes);
app.use("/api/products", requireAuth, productsRoutes);
app.use("/api/demands", requireAuth, demandsRoutes);
app.use("/api/matches", requireAuth, matchesRoutes);

app.use(errorHandler);

export default app;
