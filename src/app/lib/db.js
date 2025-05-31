import postgres from 'postgres';

const globalForSql = globalThis;

if (!globalForSql.sql) {
  globalForSql.sql = postgres(process.env.POSTGRES_URL, {
    ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
  });
}

export const sql = globalForSql.sql;
