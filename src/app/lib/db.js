import postgres from 'postgres';

const sqlInstance = postgres(process.env.POSTGRES_URL, {
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
});

export const sql = sqlInstance;