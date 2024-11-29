import { config } from "dotenv";

config();

export const env = {
  PORT: Number(process.env.PORT) || 5000,
  DATABASE_URL:
    process.env.DATABASE_URL || "mongodb://localhost:27017/user-service",
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY || "",
  JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY || "",
  PASSWORD_PRIVATE_KEY: process.env.PASSWORD_PRIVATE_KEY || "",
  PASSWORD_PUBLIC_KEY: process.env.PASSWORD_PUBLIC_KEY || "",
};
