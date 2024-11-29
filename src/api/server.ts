import express from "express";
import cors from "cors";
import { errorHandler } from "@/api/middleware/error.middleware";
import { userRouter } from "@/api/routes/user.route";

export function registerServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/user", userRouter);

  app.use(errorHandler);

  return app;
}
