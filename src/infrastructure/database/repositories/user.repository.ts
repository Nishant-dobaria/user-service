import { injectable } from "tsyringe";
import { QueryOptions } from "mongoose";
import {
  NotFoundError,
  UnprocessableEntityError,
} from "@/domain/errors/app-errors";
import { User } from "@/domain/entities/user";
import { getObjectId } from "@/domain/helpers/util";
import { UserModel } from "@/infrastructure/database/models/user.model";
import { IUserRepository } from "@/domain/interface/repositories/user.interface";
import { userError } from "@/domain/messages/error/user.error";

@injectable()
export class UserRepository implements IUserRepository {
  async get(): Promise<User[]> {
    const users = await UserModel.find().lean();

    if (!users.length) {
      throw new NotFoundError(userError.NOT_EXIST);
    }

    return users;
  }

  async getOne({
    email,
    userId,
  }: {
    email?: string;
    userId?: string;
  }): Promise<User | null> {
    const query: QueryOptions = {};

    if (userId) {
      query["_id"] = getObjectId(userId);
    } else if (email) {
      query["email"] = email;
    } else {
      throw new UnprocessableEntityError(userError.GET_PROFILE_QUEARY);
    }

    const user = await UserModel.findOne(query).lean();

    return user;
  }

  create(user: User): Promise<User> {
    return UserModel.create(user);
  }

  async delete({
    email,
    userId,
  }: {
    email?: string;
    userId?: string;
  }): Promise<User> {
    const query: QueryOptions = {};

    if (userId) {
      query["_id"] = getObjectId(userId);
    } else if (email) {
      query["email"] = email;
    } else {
      throw new UnprocessableEntityError(userError.GET_PROFILE_QUEARY);
    }

    const deletedUser = await UserModel.findOneAndDelete(query).lean();

    if (!deletedUser) {
      throw new NotFoundError(userError.NOT_EXIST);
    }

    return deletedUser;
  }
}
