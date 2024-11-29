import { injectable } from "tsyringe";
import { QueryOptions } from "mongoose";
import {
  NotFoundError,
  UnprocessableEntityError,
} from "@/domain/errors/app-errors";
import { getObjectId } from "@/domain/helpers/util";
import { userError } from "@/domain/messages/error/user.error";
import { Session } from "@/domain/entities/session.entiry";
import { SessionModel } from "@/infrastructure/database/models/session.model";
import { ISessionRepository } from "@/domain/interface/repositories/session.interface";

@injectable()
export class SessionRepository implements ISessionRepository {
  async get(userId: string): Promise<Session[]> {
    const sessions = await SessionModel.find({ userId: userId }).lean();

    if (!sessions.length) {
      throw new NotFoundError(userError.NOT_EXIST);
    }

    return sessions;
  }

  async getOne(sessionId?: string): Promise<Session> {
    if (!sessionId) {
      throw new UnprocessableEntityError(userError.GET_PROFILE_QUEARY);
    }

    const query: QueryOptions = {};

    if (sessionId) {
      const sessionObjectId = getObjectId(sessionId);
      query["_id"] = sessionObjectId;
    }

    const session = await SessionModel.findOne(query).lean();

    if (!session) {
      throw new NotFoundError(userError.NOT_EXIST);
    }

    return session;
  }

  create(user: Session): Promise<Session> {
    return SessionModel.create(user);
  }

  async delete(sessionId: string): Promise<Session> {
    const query: QueryOptions = {};

    if (sessionId) {
      throw new UnprocessableEntityError(userError.GET_PROFILE_QUEARY);
    }

    query["_id"] = getObjectId(sessionId);

    const deletedSession = await SessionModel.findOneAndDelete(query).lean();

    if (!deletedSession) {
      throw new NotFoundError(userError.NOT_EXIST);
    }

    return deletedSession;
  }
}
