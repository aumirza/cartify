// import type { drizzle as drizzlePostgresType } from "drizzle-orm/node-postgres";
// import type { drizzle as drizzlePgliteType } from "drizzle-orm/pglite";

// let db:
//   | ReturnType<typeof drizzlePostgresType>
//   | ReturnType<typeof drizzlePgliteType>;

// async function initializeDb() {
// if (process.env.NODE_ENV === "production") {
//   const { Pool } = await import("pg");
//   const { drizzle } = await import("drizzle-orm/node-postgres");
//   const client = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   });
//   return (db = drizzle(client));
// } else {
//   const { PGlite } = await import("@electric-sql/pglite");
//   const { drizzle } = await import("drizzle-orm/pglite");
//   const client = new PGlite(process.env.DATABASE_URL);
//   return (db = drizzle(client));
// }
// }

// db = await initializeDb();

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const client = neon<boolean, boolean>(process.env.DATABASE_URL!);
const db = drizzle({ client });

export default db;
