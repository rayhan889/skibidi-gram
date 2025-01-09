import { db } from './index'
import { migrate } from 'drizzle-orm/neon-http/migrator'

const migration = async () => {
  try {
    await migrate(db, {
      migrationsFolder: './db/migrations'
    })
    console.log('Migration done!')
  } catch (error) {
    console.error('Error while migrating:', error)
    process.exit(1)
  }
}

migration()
