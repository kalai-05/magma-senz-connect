import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserModel } from "../src/models/User.js";

dotenv.config();

const mongoUri = process.env.MONGODB_URI;
const adminUid = process.env.ADMIN_UID;
const ccrUid = process.env.CCR_UID;

if (!mongoUri || !adminUid || !ccrUid) {
  throw new Error("Missing MONGODB_URI, ADMIN_UID, or CCR_UID env vars");
}

const run = async () => {
  await mongoose.connect(mongoUri);

  await UserModel.findOneAndUpdate(
    { uid: adminUid },
    {
      uid: adminUid,
      name: "Admin",
      email: "admin@senzconnect.local",
      role: "admin",
      status: "active"
    },
    { upsert: true, new: true }
  );

  await UserModel.findOneAndUpdate(
    { uid: ccrUid },
    {
      uid: ccrUid,
      name: "CCR",
      email: "ccr@senzconnect.local",
      role: "ccr",
      status: "active"
    },
    { upsert: true, new: true }
  );

  await mongoose.disconnect();
  console.log("Seed complete");
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
