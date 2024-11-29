import { AuthService } from "@/domain/service/auth.service";
import { SessionService } from "@/domain/service/session.service";
import { UserService } from "@/domain/service/user.service";
import { SessionRepository } from "@/infrastructure/database/repositories/session.repository";
import { UserRepository } from "@/infrastructure/database/repositories/user.repository";
import { container } from "tsyringe";

// services registation
container.register("UserService", {
  useClass: UserService,
});
container.register("SessionService", {
  useClass: SessionService,
});
container.register("AuthService", {
  useClass: AuthService,
});

// repository registation
container.register("UserRepository", {
  useClass: UserRepository,
});
container.register("SessionRepository", {
  useClass: SessionRepository,
});

export default container;
