import { Request, Response, NextFunction } from "express";

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response<any, Record<string, any>>>;

export function asyncHandler(asyncFunction: AsyncFunction) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(asyncFunction(req, res, next)).catch((err) => next(err));
  };
}
