import { AppError } from "@/domain/errors/app-errors";
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    res
      .status(err.statusCode)
      .json({ statusCode: err.statusCode, error: err.message });

    return;
  }
  console.error(err.message);
  res.status(500).json({ error: err.message });
  return;
}
