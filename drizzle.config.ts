import { config } from "dotenv";
import { Config, defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

// const isProd = process.env.NODE_ENV === "production";

const baseConfig: Config = {
  schema: "./src/db/schemas", //file or folder
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};

// isProd
//   ? baseConfig
//   : {
//       ...baseConfig,
//       driver: "pglite",
//       dbCredentials: {
//         url: process.env.DATABASE_URL!,
//       },
//     }

export default defineConfig(baseConfig);
