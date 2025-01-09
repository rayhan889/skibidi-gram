import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { config } from 'dotenv'

config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL!)
// logger
// const const db = drizzle({client: sql, logger: true});
const db = drizzle({ client: sql })

export { db }
