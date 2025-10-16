import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!, // <-- the ! tells TS it's not undefined
});

export const db = drizzle(pool);
