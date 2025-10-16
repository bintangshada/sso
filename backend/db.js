import dotenv from "dotenv";
import pkg from "pg";
dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: { rejectUnauthorized: false } // kalau butuh SSL (di cloud), untuk lokal tidak perlu
});

// Helper: cek koneksi cepat
export async function pingDb() {
  const res = await pool.query("select 1 as ok");
  return res.rows[0].ok === 1;
}
