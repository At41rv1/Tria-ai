import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { config } from './environment';

const connectionString = config.database.url;

if (!connectionString) {
  throw new Error('Database URL is not configured. Please set VITE_DATABASE_URL environment variable.');
}

const sql = neon(connectionString);
export const db = drizzle(sql);
