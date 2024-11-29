import mongoose, { Schema } from "mongoose";
import { Session } from "@/domain/entities/session.entiry";

const SessionSchema: Schema = new Schema<Session>(
  {
    //@ts-ignore
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
  },
  { timestamps: true }
);

export const SessionModel = mongoose.model<Session>("Session", SessionSchema);
