import "dotenv/config"
import { defineConfig } from "drizzle-kit";

import { env } from "./src/utils/env"

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL! as string
  },
  verbose: true, // It will show exactly what changes are going to be made upon migration
  strict: true, // It will make sure to change certain things on a migration
})