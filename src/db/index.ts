import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from "pg";

import * as schema from "./schema"
import { env } from "../utils/env"

const pool = new pg.Pool({ connectionString: env.DATABASE_URL })
const db = drizzle(pool, { schema, logger: true })

export { db, pool }