import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { join } from "path";

const url = process.env.DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("DATABASE_URL and TURSO_AUTH_TOKEN are required");
  process.exit(1);
}

const client = createClient({ url, authToken });

const migrationPath = join(process.cwd(), "prisma/migrations/20260505011421_init/migration.sql");
const sql = readFileSync(migrationPath, "utf-8");

// Split statements, strip comment lines, filter empty ones
const statements = sql
  .split(";")
  .map((s) =>
    s
      .split("\n")
      .filter((line) => !line.trimStart().startsWith("--"))
      .join("\n")
      .trim()
  )
  .filter((s) => s.length > 0);

async function migrate() {
  console.log("Applying migrations to Turso...");
  for (const stmt of statements) {
    try {
      await client.execute(stmt);
      console.log("OK:", stmt.slice(0, 60).replace(/\n/g, " ") + "...");
    } catch (e: any) {
      if (e.message?.includes("already exists")) {
        console.log("SKIP (already exists):", stmt.slice(0, 50));
      } else {
        throw e;
      }
    }
  }
  console.log("Migrations applied.");
  await client.close();
}

migrate().catch((e) => { console.error(e); process.exit(1); });
