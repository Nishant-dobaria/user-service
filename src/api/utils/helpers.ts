import { UnauthorizedError } from "@/domain/errors/app-errors";
import { userError } from "@/domain/messages/error/user.error";

export function extractBearerToken(token: string) {
  if (token && token.startsWith("Bearer ")) {
    return token.substring(7);
  }
  throw new UnauthorizedError(userError.NOT_VALID_TOKEN);
}
