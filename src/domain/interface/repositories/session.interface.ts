import { Session } from "@/domain/entities/session.entiry";

export interface ISessionRepository {
  get(userId: string): Promise<Session[]>;

  getOne(sessionId?: string): Promise<Session>;

  create(user: Session): Promise<Session>;

  delete(sessionId?: string): Promise<Session>;
}
