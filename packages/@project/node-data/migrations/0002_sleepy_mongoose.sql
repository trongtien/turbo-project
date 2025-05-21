CREATE TABLE "project_categories" (
	"name" varchar(256) NOT NULL,
	"description" text DEFAULT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_deleted" boolean DEFAULT false,
	"utc_created_on" timestamp DEFAULT now() NOT NULL,
	"utc_updated_on" timestamp DEFAULT now() NOT NULL,
	"created_by" text DEFAULT NULL,
	"updated_by" text DEFAULT NULL
);
--> statement-breakpoint
CREATE TABLE "project_projects" (
	"name" varchar(256) NOT NULL,
	"description" text DEFAULT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_deleted" boolean DEFAULT false,
	"utc_created_on" timestamp DEFAULT now() NOT NULL,
	"utc_updated_on" timestamp DEFAULT now() NOT NULL,
	"created_by" text DEFAULT NULL,
	"updated_by" text DEFAULT NULL
);
--> statement-breakpoint
DROP TABLE "hono_category" CASCADE;