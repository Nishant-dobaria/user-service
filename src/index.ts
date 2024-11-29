import "reflect-metadata";
import { registerServer } from "@/api/server";
import { mountCriticalErrorHandlers } from "@/domain/helpers/globalErrorHandler";
import { dbConnect } from "@/infrastructure/database/client/db";
import { env } from "@/config/env";

async function init() {
  try {
    const server = registerServer();
    await dbConnect();
    server.listen(env.PORT, () => {
      console.log(`Server running on ${env.PORT}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

mountCriticalErrorHandlers();

init();
