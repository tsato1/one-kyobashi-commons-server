CREATE TABLE "meeting" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"visibility" "visibility" NOT NULL,
	"start_date" timestamp with time zone,
	"end_date" timestamp with time zone,
	"description" text,
	"location" text NOT NULL,
	"allowed_roles" text[],
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
