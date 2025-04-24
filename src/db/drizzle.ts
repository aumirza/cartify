import { config } from "dotenv";
config({ path: ".env" }); // Load environment variables

import { drizzle as drizzlePostgres } from "drizzle-orm/node-postgres";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import { Pool } from "pg";
import { PGlite } from "@electric-sql/pglite";
import { NodeFS } from "@electric-sql/pglite/nodefs";

let db: ReturnType<typeof drizzlePostgres> | ReturnType<typeof drizzlePglite>;

if (process.env.NODE_ENV === "production") {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  db = drizzlePostgres(client);
} else {
  const client = new PGlite({
    // filesystem
    fs: new NodeFS(process.env.DATABASE_URL!),
  });
  db = drizzlePglite(client);
}

export default db;
