import "dotenv/config";

import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, pool } from "./index";

async function main() {
  await migrate(db, { migrationsFolder: "migrations" });
  await pool.end();
}

main();