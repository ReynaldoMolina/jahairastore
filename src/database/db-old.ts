import postgres from 'postgres';

const SQL_OPTIONS = {
  ssl: process.env.NODE_ENV === 'production' ? ('require' as const) : false,
  max: 10,
  idle_timeout: 30,
  max_lifetime: 60 * 60,
};

let sql;

if (!global._sql) {
  global._sql = postgres(process.env.POSTGRES_URL, SQL_OPTIONS);
}

sql = global._sql;

export { sql };
