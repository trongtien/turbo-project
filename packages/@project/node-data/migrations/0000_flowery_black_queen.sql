CREATE TABLE "hono_category" (
	"name" varchar(256) NOT NULL,
	"description" text DEFAULT NULL,
	"uuid2" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_deleted" boolean DEFAULT false,
	"utc_created_on" timestamp DEFAULT now() NOT NULL,
	"utc_updated_on" timestamp DEFAULT now() NOT NULL,
	"created_by" text DEFAULT NULL,
	"updated_by" text DEFAULT NULL
);
