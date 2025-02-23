ALTER TABLE "user_extras" DROP CONSTRAINT "user_extras_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_extras" ADD CONSTRAINT "user_extras_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_extras" DROP COLUMN "id";