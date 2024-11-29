import { inject, injectable } from "tsyringe";
import { ISessionRepository } from "@/domain/interface/repositories/session.interface";
import { Session } from "@/domain/entities/session.entiry";
import { ISessionService } from "@/domain/interface/service/session.interface";

@injectable()
export class SessionService implements ISessionService {
  constructor(
    @inject("SessionRepository")
    private sessionRepository: ISessionRepository
  ) {}

  get(userId: string): Promise<Session[]> {
    return this.sessionRepository.get(userId);
  }

  getOne(sessionId: string): Promise<Session> {
    return this.sessionRepository.getOne(sessionId);
  }

  create(session: Session): Promise<Session> {
    return this.sessionRepository.create(session);
  }

  delete(sessionId: string): Promise<Session> {
    return this.sessionRepository.delete(sessionId);
  }
}
