import Joi from "joi";

export const createUserValidator = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  dateOfBirth: Joi.string().optional(),
}).required();

export const getUserValidator = Joi.object({
  userId: Joi.string().optional(),
}).optional();

export const deleteUserValidator = Joi.object({
  userId: Joi.string().required(),
}).required();
