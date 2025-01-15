import {
  pgTable,
  varchar,
  timestamp,
  text,
  integer,
  primaryKey
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import crypto from 'crypto'
import type { AdapterAccount } from 'next-auth/adapters'

export const users = pgTable('users', {
  id: varchar('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar('name').notNull(),
  username: varchar('username').unique().notNull(),
  email: varchar('email').unique().notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const accounts = pgTable(
  'accounts',
  {
    userId: varchar('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type').$type<AdapterAccount>().notNull(),
    provider: varchar('provider').notNull(),
    providerAccountId: varchar('providerAccountId').notNull(),
    refresh_token: varchar('refresh_token'),
    access_token: varchar('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type'),
    scope: varchar('scope'),
    id_token: varchar('id_token'),
    session_state: varchar('session_state')
  },
  account => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId]
      })
    }
  ]
)

export const sessions = pgTable('sessions', {
  sessionToken: varchar('session_token').primaryKey(),
  userId: varchar('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull()
})

export const memes = pgTable('memes', {
  id: varchar('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar('user_id')
    .notNull()
    .references(() => users.id),
  title: varchar('title').notNull(),
  body: varchar('body').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const usersRelations = relations(users, ({ many }) => ({
  memes: many(memes)
}))

export const memesRelations = relations(memes, ({ one }) => ({
  user: one(users, {
    fields: [memes.userId],
    references: [users.id]
  })
}))
