ALTER TABLE "event" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "event" DROP COLUMN "content";--> statement-breakpoint
ALTER TABLE "event" DROP COLUMN "default_locale";