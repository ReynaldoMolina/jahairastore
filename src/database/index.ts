import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';


const isProd = process.env.NODE_ENV === 'production';

export const db = drizzle({ 
  connection: { 
    connectionString: process.env.DATABASE_URL!,
    ssl: isProd ? { rejectUnauthorized: false } : false,
  }
});
