import { UnauthorizedError } from "@/domain/errors/app-errors";
import { asyncHandler } from "@/api/utils/async.util";
import { userError } from "@/domain/messages/error/user.error";
import container from "@/dependency/container";
import { IAuthService } from "@/domain/interface/service/auth.interface";
import { IUserService } from "@/domain/interface/service/user.interface";
import { ISessionService } from "@/domain/interface/service/session.interface";
import { extractBearerToken } from "@/api/utils/helpers";

const authService = container.resolve<IAuthService>("AuthService");
const userService = container.resolve<IUserService>("UserService");
const sessionService = container.resolve<ISessionService>("SessionService");

//@ts-ignore
export const verifyJWT = asyncHandler(async (req, res, next) => {
  let token = req?.headers?.authorization || req?.cookies?.token;

  if (!token) {
    throw new UnauthorizedError(userError.UN_AUTHORIZED);
  }

  token = extractBearerToken(token);

  const JwtPayload = authService.verifySessionToken(token);

  const session = await sessionService.getOne(JwtPayload.sessionId);

  if (!session.token === token) {
    throw new UnauthorizedError(userError.UN_AUTHORIZED);
  }

  const user = await userService.getOne({ userId: JwtPayload.userId });

  if (!user) {
    throw new UnauthorizedError(userError.UN_AUTHORIZED);
  }

  user.session = session;
  //@ts-ignore
  req.user = user;

  next();
});
