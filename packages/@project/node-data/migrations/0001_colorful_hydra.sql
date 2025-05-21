ALTER TABLE "hono_category" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "hono_category" DROP COLUMN "uuid2";