import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { seedProducts } from "./seed-products";

const client = neon(process.env.DATABASE_URL!);
const db = drizzle(client);

async function main() {
  await seedProducts(db);
}

main().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
