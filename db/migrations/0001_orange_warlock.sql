CREATE TABLE "user_extras" (
	"id" text PRIMARY KEY NOT NULL,
	"bio" text,
	"background" text,
	"userId" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_extras" ADD CONSTRAINT "user_extras_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;