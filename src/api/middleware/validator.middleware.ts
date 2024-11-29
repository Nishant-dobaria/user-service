import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export enum PropertyEnum {
  BODY = "body",
  QUERY = "query",
  PARAMS = "params",
}

export function validate(schema: Schema, property: PropertyEnum) {
  return function (req: Request, res: Response, next: NextFunction) {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      res.status(400).json({
        statusCode: 400,
        message: "Validation Error",
        errors: error.details.map((detail) => ({
          field: detail.path.join("."),
          message: detail.message,
        })),
      });
      return;
    }

    next();
  };
}
export default validate;
