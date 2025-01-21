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

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  username: varchar('username').unique(),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state')
  },
  account => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId]
      })
    }
  ]
)

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull()
})

export const memes = pgTable('memes', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('userId')
    .notNull()
    .references(() => users.id),
  title: varchar('title').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const files = pgTable('files', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  fileName: varchar('file_name').notNull(),
  fileType: varchar('file_type').notNull(),
  path: varchar('path').notNull(),
  memeId: text('meme_id')
    .notNull()
    .references(() => memes.id)
})

export const usersRelations = relations(users, ({ many }) => ({
  memes: many(memes)
}))

export const memesRelations = relations(memes, ({ one, many }) => ({
  user: one(users, {
    fields: [memes.userId],
    references: [users.id]
  }),
  files: many(files)
}))

export const filesRelations = relations(files, ({ one }) => ({
  meme: one(memes, {
    fields: [files.memeId],
    references: [memes.id]
  })
}))
