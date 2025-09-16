CREATE TYPE "public"."currency" AS ENUM('JPY', 'USD');--> statement-breakpoint
CREATE TYPE "public"."eventStatus" AS ENUM('Draft', 'InReview', 'Approved', 'Rejected', 'Published', 'Canceled', 'Archived');--> statement-breakpoint
CREATE TYPE "public"."visibility" AS ENUM('Public', 'Private');--> statement-breakpoint
CREATE TABLE "admin" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cognitoId" varchar NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"image" text
);
--> statement-breakpoint
CREATE TABLE "crew" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cognitoId" varchar NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"image" text
);
--> statement-breakpoint
CREATE TABLE "event" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" "eventStatus",
	"name" text,
	"description" text,
	"content" jsonb,
	"default_locale" varchar(10) NOT NULL,
	"venue" jsonb,
	"start_date" timestamp with time zone,
	"end_date" timestamp with time zone,
	"tags" text[],
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trustee" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cognitoId" varchar NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"image" text
);
