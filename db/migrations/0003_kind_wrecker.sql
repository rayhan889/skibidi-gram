CREATE TABLE "likes" (
	"userId" text NOT NULL,
	"meme_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "likes_userId_meme_id_pk" PRIMARY KEY("userId","meme_id")
);
--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "files_meme_id_memes_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_meme_id_memes_id_fk" FOREIGN KEY ("meme_id") REFERENCES "public"."memes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_meme_id_memes_id_fk" FOREIGN KEY ("meme_id") REFERENCES "public"."memes"("id") ON DELETE cascade ON UPDATE no action;