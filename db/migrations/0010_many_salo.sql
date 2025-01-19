CREATE TABLE "files" (
	"id" text PRIMARY KEY NOT NULL,
	"file_name" varchar NOT NULL,
	"file_type" varchar NOT NULL,
	"path" varchar NOT NULL,
	"meme_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_meme_id_memes_id_fk" FOREIGN KEY ("meme_id") REFERENCES "public"."memes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "memes" DROP COLUMN "body";