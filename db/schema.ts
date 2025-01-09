import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const memes = pgTable('memes', {
  id: serial('id').primaryKey(),
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
