CREATE TABLE "project_project_categories" (
	"project_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_deleted" boolean DEFAULT false,
	"utc_created_on" timestamp DEFAULT now() NOT NULL,
	"utc_updated_on" timestamp DEFAULT now() NOT NULL,
	"created_by" text DEFAULT NULL,
	"updated_by" text DEFAULT NULL
);
--> statement-breakpoint
ALTER TABLE "project_project_categories" ADD CONSTRAINT "project_project_categories_project_id_project_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project_projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_project_categories" ADD CONSTRAINT "project_project_categories_category_id_project_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."project_categories"("id") ON DELETE no action ON UPDATE no action;