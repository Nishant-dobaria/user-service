import { Session } from "@/domain/entities/session.entiry";

export interface ISessionService {
  get(userId: string): Promise<Session[]>;
  getOne(sessionId: string): Promise<Session>;
  create(session: Session): Promise<Session>;
  delete(sessionId: string): Promise<Session>;
}
