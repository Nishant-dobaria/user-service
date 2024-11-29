import mongoose from "mongoose";
import { UnprocessableEntityError } from "@/domain/errors/app-errors";

export function generateObjectId(id?: string) {
  return new mongoose.Types.ObjectId(id);
}

export function getObjectIds(ids: Array<string>) {
  return ids.map((id) => {
    if (!mongoose.isValidObjectId(id)) {
      throw new UnprocessableEntityError("not valid ObjectId");
    }
    return generateObjectId(id);
  });
}

export function getObjectId(id: string) {
  if (!mongoose.isValidObjectId(id)) {
    throw new UnprocessableEntityError("not valid ObjectId");
  }
  return generateObjectId(id);
}
