import mongoose, { Schema } from "mongoose";
import { User } from "@/domain/entities/user";

const UserSchema: Schema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<User>("User", UserSchema);
