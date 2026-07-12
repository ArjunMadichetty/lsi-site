import "server-only";
import { Pool } from "pg";

/**
 * Minimal Postgres access for quote submissions.
 * - Uses a single pooled connection (cached across dev HMR reloads).
 * - No-ops gracefully when DATABASE_URL is unset so the app runs locally and
 *   the form still succeeds via the email sink ("nothing lost").
 */

type GlobalWithPool = typeof globalThis & { __lsiPgPool?: Pool | null };
const g = globalThis as GlobalWithPool;

function getPool(): Pool | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (g.__lsiPgPool !== undefined && g.__lsiPgPool !== null) return g.__lsiPgPool;

  const isLocal = /@(localhost|127\.0\.0\.1)/.test(url);
  const pool = new Pool({
    connectionString: url,
    ssl: isLocal ? false : { rejectUnauthorized: false },
    max: 3,
    connectionTimeoutMillis: 8000,
    idleTimeoutMillis: 30000,
  });
  pool.on("error", (err) => console.error("[db] idle client error:", err.message));
  g.__lsiPgPool = pool;
  return pool;
}

let schemaReady: Promise<void> | null = null;

async function ensureSchema(pool: Pool): Promise<void> {
  if (!schemaReady) {
    schemaReady = pool
      .query(
        `CREATE TABLE IF NOT EXISTS quote_requests (
           id            BIGSERIAL PRIMARY KEY,
           created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
           kind          TEXT NOT NULL DEFAULT 'quote',
           name          TEXT NOT NULL,
           email         TEXT NOT NULL,
           phone         TEXT,
           company       TEXT,
           service       TEXT,
           material      TEXT,
           quantity      TEXT,
           tolerance     TEXT,
           due_date      TEXT,
           message       TEXT NOT NULL,
           file_names    TEXT,
           source_ip     TEXT,
           status        TEXT NOT NULL DEFAULT 'new'
         );
         ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS kind TEXT NOT NULL DEFAULT 'quote';`,
      )
      .then(() => undefined)
      .catch((err) => {
        schemaReady = null; // allow retry on next request
        throw err;
      });
  }
  return schemaReady;
}

export type QuoteRecord = {
  kind?: "quote" | "contact";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  material?: string;
  quantity?: string;
  tolerance?: string;
  dueDate?: string;
  message: string;
  fileNames?: string[];
  sourceIp?: string;
};

/** Persist a quote. Returns the new row id, or null if no DB is configured. */
export async function saveQuote(rec: QuoteRecord): Promise<string | null> {
  const pool = getPool();
  if (!pool) {
    console.warn("[db] DATABASE_URL not set — skipping DB write.");
    return null;
  }
  await ensureSchema(pool);
  const { rows } = await pool.query<{ id: string }>(
    `INSERT INTO quote_requests
       (kind, name, email, phone, company, service, material, quantity, tolerance, due_date, message, file_names, source_ip)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     RETURNING id`,
    [
      rec.kind || "quote",
      rec.name,
      rec.email,
      rec.phone || null,
      rec.company || null,
      rec.service || null,
      rec.material || null,
      rec.quantity || null,
      rec.tolerance || null,
      rec.dueDate || null,
      rec.message,
      rec.fileNames?.length ? rec.fileNames.join(", ") : null,
      rec.sourceIp || null,
    ],
  );
  return rows[0]?.id ?? null;
}

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
