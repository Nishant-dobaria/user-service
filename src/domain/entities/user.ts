import { Session } from "@/domain/entities/session.entiry";

export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  dateOfBirth: Date;
  session?: Session;
  createdAt?: Date;
  updatedAt?: Date;
}
