import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@/domain/interface/repositories/user.interface";
import { User } from "@/domain/entities/user";
import { IAuthService } from "@/domain/interface/service/auth.interface";
import { IUserService } from "@/domain/interface/service/user.interface";
import { userError } from "@/domain/messages/error/user.error";
import { ISessionService } from "@/domain/interface/service/session.interface";
import { JwtPayload } from "@/domain/entities/jwt.entity";
import { Session } from "@/domain/entities/session.entiry";
import { generateObjectId } from "@/domain/helpers/util";
import {
  ConflictError,
  UnprocessableEntityError,
} from "@/domain/errors/app-errors";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("AuthService")
    private authService: IAuthService,
    @inject("SessionService")
    private sessionService: ISessionService
  ) {}

  get(): Promise<User[]> {
    return this.userRepository.get();
  }

  getOne({
    email,
    userId,
  }: {
    email?: string;
    userId?: string;
  }): Promise<User | null> {
    return this.userRepository.getOne({ email, userId });
  }

  async create(userObj: User): Promise<User> {
    const isUser = await this.getOne({ email: userObj.email });

    if (isUser) {
      throw new ConflictError(userError.ALREADY_EXIST);
    }

    if (!userObj.password) {
      throw new ConflictError(userError.PASSWORD_REQURIED);
    }

    userObj.password = this.authService.encryptPassword(userObj.password);

    const user = await this.userRepository.create(userObj);

    const jwt: JwtPayload = {
      //@ts-ignore
      sessionId: generateObjectId(),
      userId: user._id,
      email: user.email,
    };

    const token = this.authService.createSessionToken(jwt);

    const sessionObj: Session = {
      //@ts-ignore
      _id: jwt.sessionId,
      userId: user._id,
      token: token,
    };

    const session = await this.sessionService.create(sessionObj);

    user.session = session;

    return user;
  }

  delete({
    email,
    userId,
  }: {
    email?: string;
    userId?: string;
  }): Promise<User> {
    if (!userId && !email) {
      throw new UnprocessableEntityError("userId or email is required");
    }

    return this.userRepository.delete({
      email,
      userId,
    });
  }
}
