ALTER TABLE "users" RENAME COLUMN "name" TO "username";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "first_name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "picture" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone" varchar;