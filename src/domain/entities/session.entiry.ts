export interface Session {
  _id: string;
  userId: string;
  token: string;
  createdAt?: Date;
  updatedAt?: Date;
}
