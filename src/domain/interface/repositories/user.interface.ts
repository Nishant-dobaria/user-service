import { User } from "@/domain/entities/user";

export interface IUserRepository {
  get(): Promise<User[]>;

  getOne({
    email,
    userId,
  }: {
    email?: string;
    userId?: string;
  }): Promise<User | null>;

  create(user: User): Promise<User>;

  delete({ email, userId }: { email?: string; userId?: string }): Promise<User>;
}
