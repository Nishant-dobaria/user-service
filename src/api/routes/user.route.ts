import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
} from "@/api/controllers/user.controller";
import { verifyJWT } from "@/api/middleware/jwt.middleware";
import validate, { PropertyEnum } from "@/api/middleware/validator.middleware";
import {
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
} from "@/api/validators/user.validator";

export const userRouter = Router();

userRouter
  .route("")
  .post(validate(createUserValidator, PropertyEnum.BODY), createUser);

userRouter.route("/all").get(verifyJWT, getUsers);

userRouter
  .route("")
  .get(validate(getUserValidator, PropertyEnum.QUERY), verifyJWT, getUser);

userRouter
  .route("")
  .delete(
    validate(deleteUserValidator, PropertyEnum.BODY),
    verifyJWT,
    deleteUser
  );
