import mongoose from "mongoose";
import { env } from "@/config/env";

export async function dbConnect() {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log("DB connected");
  } catch (error) {
    console.error("error while DB connection: ", error);
    process.exit(1);
  }
}
