import container from "@/dependency/container";
import { asyncHandler } from "@/api/utils/async.util";
import { User } from "@/domain/entities/user";
import { generateObjectId } from "@/domain/helpers/util";
import { IUserService } from "@/domain/interface/service/user.interface";
import { userSuccess } from "@/domain/messages/success/user.message";
import { InternalServerError, NotFoundError } from "@/domain/errors/app-errors";
import { userError } from "@/domain/messages/error/user.error";

const userService = container.resolve<IUserService>("UserService");

export const createUser = asyncHandler(async (req, res, next) => {
  const body = req.body;

  const user: User = {
    //@ts-ignore
    _id: generateObjectId(),
    email: body.email,
    name: body.name,
    password: body.password,
    dateOfBirth: body.dateOfBirth,
  };

  const newUser = await userService.create(user);

  if (!newUser?.session?.token) {
    throw new InternalServerError(userError.ERROR_SESSION);
  }

  const token = newUser.session.token;

  return res
    .json({
      statusCode: 201,
      data: {
        token,
      },
      message: userSuccess.SIGN_UP,
    })
    .status(201);
});

export const getUser = asyncHandler(async (req, res, next) => {
  const query = req.query;
  //@ts-ignore
  const authUser = req.user;

  const user = await userService.getOne({
    userId: query.userId || authUser._id,
  });

  if (!user) {
    throw new NotFoundError(userError.NOT_FOUND);
  }

  return res
    .json({
      statusCode: 200,
      data: user,
      message: userSuccess.SENT,
    })
    .status(200);
});

export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await userService.get();

  return res
    .json({
      statusCode: 200,
      data: users,
      message: userSuccess.SENT_USERS,
    })
    .status(200);
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const body = req.body;

  await userService.delete({ userId: body.userId, email: body.email });

  return res
    .json({
      statusCode: 204,
      message: userSuccess.DLETED,
    })
    .status(204);
});
