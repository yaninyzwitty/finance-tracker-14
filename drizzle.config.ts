import { config  } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" })

export default defineConfig({
    schema: "./db/schema.ts",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!
    },
    driver: 'pg',
    verbose: true,
    strict: true
  
})