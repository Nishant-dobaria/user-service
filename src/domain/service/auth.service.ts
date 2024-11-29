import { injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken";
import { sign as cryptoSign, verify as cryptoVerify, constants } from "crypto";
import { env } from "@/config/env";
import { JwtPayload } from "@/domain/entities/jwt.entity";
import { IAuthService } from "@/domain/interface/service/auth.interface";
import { UnauthorizedError } from "../errors/app-errors";
import { userError } from "../messages/error/user.error";

@injectable()
export class AuthService implements IAuthService {
  constructor() {}

  createSessionToken(tokenPayload: JwtPayload): string {
    const token = sign({ ...tokenPayload }, env.JWT_PRIVATE_KEY, {
      expiresIn: "2d",
      algorithm: "RS256",
    });
    return token;
  }

  verifySessionToken(token: string) {
    try {
      const payload = verify(token, env.JWT_PUBLIC_KEY, {
        algorithms: ["RS256"],
      });
      return payload as JwtPayload;
    } catch (error) {
      throw new UnauthorizedError(userError.TOKEN_EXPIRED);
    }
  }

  encryptPassword(password: string) {
    const signature = cryptoSign("RSA-SHA256", Buffer.from(password), {
      key: env.PASSWORD_PRIVATE_KEY,
      padding: constants.RSA_PKCS1_PADDING,
    });

    return signature.toString("base64");
  }

  verifyPassword(password: string, signature: string) {
    const isPassVerified = cryptoVerify(
      "RSA-SHA256",
      Buffer.from(password),
      { key: env.PASSWORD_PUBLIC_KEY, padding: constants.RSA_PKCS1_PADDING },
      Buffer.from(signature, "base64")
    );
    return isPassVerified;
  }
}
