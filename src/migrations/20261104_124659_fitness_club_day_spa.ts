import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_fitness_club_sessions_day" AS ENUM('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');
  CREATE TYPE "public"."enum_fitness_club_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__fitness_club_v_version_sessions_day" AS ENUM('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');
  CREATE TYPE "public"."enum__fitness_club_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__fitness_club_v_published_locale" AS ENUM('en', 'bs');
  CREATE TYPE "public"."enum_day_spa_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__day_spa_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__day_spa_v_published_locale" AS ENUM('en', 'bs');
  CREATE TABLE "homepage_club_fitness_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "homepage_club_spa_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_homepage_v_version_club_fitness_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_version_club_spa_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "fitness_club_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" "enum_fitness_club_sessions_day",
  	"start" varchar,
  	"end" varchar,
  	"instructor" varchar
  );
  
  CREATE TABLE "fitness_club_sessions_locales" (
  	"name" varchar,
  	"studio" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "fitness_club_plans_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "fitness_club_plans_includes_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "fitness_club_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "fitness_club_plans_locales" (
  	"name" varchar,
  	"price" varchar,
  	"period" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "fitness_club" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_status" "enum_fitness_club_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "fitness_club_locales" (
  	"month" varchar,
  	"note" varchar,
  	"membership_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_fitness_club_v_version_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"day" "enum__fitness_club_v_version_sessions_day",
  	"start" varchar,
  	"end" varchar,
  	"instructor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_fitness_club_v_version_sessions_locales" (
  	"name" varchar,
  	"studio" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_fitness_club_v_version_plans_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_fitness_club_v_version_plans_includes_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_fitness_club_v_version_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"featured" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_fitness_club_v_version_plans_locales" (
  	"name" varchar,
  	"price" varchar,
  	"period" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_fitness_club_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version__status" "enum__fitness_club_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__fitness_club_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_fitness_club_v_locales" (
  	"version_month" varchar,
  	"version_note" varchar,
  	"version_membership_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "day_spa_categories_items_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "day_spa_categories_items_includes_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "day_spa_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"duration" varchar,
  	"price" varchar
  );
  
  CREATE TABLE "day_spa_categories_items_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "day_spa_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "day_spa_categories_locales" (
  	"name" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "day_spa" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_status" "enum_day_spa_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "day_spa_locales" (
  	"updated" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_day_spa_v_version_categories_items_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_day_spa_v_version_categories_items_includes_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_day_spa_v_version_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"duration" varchar,
  	"price" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_day_spa_v_version_categories_items_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_day_spa_v_version_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_day_spa_v_version_categories_locales" (
  	"name" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_day_spa_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version__status" "enum__day_spa_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__day_spa_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_day_spa_v_locales" (
  	"version_updated" varchar,
  	"version_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  ALTER TABLE "homepage_locales" ADD COLUMN "club_meta_left" varchar;
  ALTER TABLE "homepage_locales" ADD COLUMN "club_meta_center" varchar;
  ALTER TABLE "homepage_locales" ADD COLUMN "club_meta_right" varchar;
  ALTER TABLE "homepage_locales" ADD COLUMN "club_title" varchar;
  ALTER TABLE "homepage_locales" ADD COLUMN "club_intro" varchar;
  ALTER TABLE "homepage_locales" ADD COLUMN "club_fitness_tagline" varchar;
  ALTER TABLE "homepage_locales" ADD COLUMN "club_fitness_body" varchar;
  ALTER TABLE "homepage_locales" ADD COLUMN "club_fitness_cta" varchar;
  ALTER TABLE "homepage_locales" ADD COLUMN "club_spa_tagline" varchar;
  ALTER TABLE "homepage_locales" ADD COLUMN "club_spa_body" varchar;
  ALTER TABLE "homepage_locales" ADD COLUMN "club_spa_cta" varchar;
  ALTER TABLE "_homepage_v_locales" ADD COLUMN "version_club_meta_left" varchar;
  ALTER TABLE "_homepage_v_locales" ADD COLUMN "version_club_meta_center" varchar;
  ALTER TABLE "_homepage_v_locales" ADD COLUMN "version_club_meta_right" varchar;
  ALTER TABLE "_homepage_v_locales" ADD COLUMN "version_club_title" varchar;
  ALTER TABLE "_homepage_v_locales" ADD COLUMN "version_club_intro" varchar;
  ALTER TABLE "_homepage_v_locales" ADD COLUMN "version_club_fitness_tagline" varchar;
  ALTER TABLE "_homepage_v_locales" ADD COLUMN "version_club_fitness_body" varchar;
  ALTER TABLE "_homepage_v_locales" ADD COLUMN "version_club_fitness_cta" varchar;
  ALTER TABLE "_homepage_v_locales" ADD COLUMN "version_club_spa_tagline" varchar;
  ALTER TABLE "_homepage_v_locales" ADD COLUMN "version_club_spa_body" varchar;
  ALTER TABLE "_homepage_v_locales" ADD COLUMN "version_club_spa_cta" varchar;
  ALTER TABLE "homepage_club_fitness_facts" ADD CONSTRAINT "homepage_club_fitness_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_club_spa_facts" ADD CONSTRAINT "homepage_club_spa_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_club_fitness_facts" ADD CONSTRAINT "_homepage_v_version_club_fitness_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_club_spa_facts" ADD CONSTRAINT "_homepage_v_version_club_spa_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fitness_club_sessions" ADD CONSTRAINT "fitness_club_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fitness_club"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fitness_club_sessions_locales" ADD CONSTRAINT "fitness_club_sessions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fitness_club_sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fitness_club_plans_includes" ADD CONSTRAINT "fitness_club_plans_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fitness_club_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fitness_club_plans_includes_locales" ADD CONSTRAINT "fitness_club_plans_includes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fitness_club_plans_includes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fitness_club_plans" ADD CONSTRAINT "fitness_club_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fitness_club"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fitness_club_plans_locales" ADD CONSTRAINT "fitness_club_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fitness_club_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fitness_club_locales" ADD CONSTRAINT "fitness_club_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fitness_club"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fitness_club_v_version_sessions" ADD CONSTRAINT "_fitness_club_v_version_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fitness_club_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fitness_club_v_version_sessions_locales" ADD CONSTRAINT "_fitness_club_v_version_sessions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fitness_club_v_version_sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fitness_club_v_version_plans_includes" ADD CONSTRAINT "_fitness_club_v_version_plans_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fitness_club_v_version_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fitness_club_v_version_plans_includes_locales" ADD CONSTRAINT "_fitness_club_v_version_plans_includes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fitness_club_v_version_plans_includes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fitness_club_v_version_plans" ADD CONSTRAINT "_fitness_club_v_version_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fitness_club_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fitness_club_v_version_plans_locales" ADD CONSTRAINT "_fitness_club_v_version_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fitness_club_v_version_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fitness_club_v_locales" ADD CONSTRAINT "_fitness_club_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fitness_club_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "day_spa_categories_items_includes" ADD CONSTRAINT "day_spa_categories_items_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."day_spa_categories_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "day_spa_categories_items_includes_locales" ADD CONSTRAINT "day_spa_categories_items_includes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."day_spa_categories_items_includes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "day_spa_categories_items" ADD CONSTRAINT "day_spa_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."day_spa_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "day_spa_categories_items_locales" ADD CONSTRAINT "day_spa_categories_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."day_spa_categories_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "day_spa_categories" ADD CONSTRAINT "day_spa_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."day_spa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "day_spa_categories_locales" ADD CONSTRAINT "day_spa_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."day_spa_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "day_spa_locales" ADD CONSTRAINT "day_spa_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."day_spa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_day_spa_v_version_categories_items_includes" ADD CONSTRAINT "_day_spa_v_version_categories_items_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_day_spa_v_version_categories_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_day_spa_v_version_categories_items_includes_locales" ADD CONSTRAINT "_day_spa_v_version_categories_items_includes_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_day_spa_v_version_categories_items_includes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_day_spa_v_version_categories_items" ADD CONSTRAINT "_day_spa_v_version_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_day_spa_v_version_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_day_spa_v_version_categories_items_locales" ADD CONSTRAINT "_day_spa_v_version_categories_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_day_spa_v_version_categories_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_day_spa_v_version_categories" ADD CONSTRAINT "_day_spa_v_version_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_day_spa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_day_spa_v_version_categories_locales" ADD CONSTRAINT "_day_spa_v_version_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_day_spa_v_version_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_day_spa_v_locales" ADD CONSTRAINT "_day_spa_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_day_spa_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_club_fitness_facts_order_idx" ON "homepage_club_fitness_facts" USING btree ("_order");
  CREATE INDEX "homepage_club_fitness_facts_parent_id_idx" ON "homepage_club_fitness_facts" USING btree ("_parent_id");
  CREATE INDEX "homepage_club_fitness_facts_locale_idx" ON "homepage_club_fitness_facts" USING btree ("_locale");
  CREATE INDEX "homepage_club_spa_facts_order_idx" ON "homepage_club_spa_facts" USING btree ("_order");
  CREATE INDEX "homepage_club_spa_facts_parent_id_idx" ON "homepage_club_spa_facts" USING btree ("_parent_id");
  CREATE INDEX "homepage_club_spa_facts_locale_idx" ON "homepage_club_spa_facts" USING btree ("_locale");
  CREATE INDEX "_homepage_v_version_club_fitness_facts_order_idx" ON "_homepage_v_version_club_fitness_facts" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_club_fitness_facts_parent_id_idx" ON "_homepage_v_version_club_fitness_facts" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_club_fitness_facts_locale_idx" ON "_homepage_v_version_club_fitness_facts" USING btree ("_locale");
  CREATE INDEX "_homepage_v_version_club_spa_facts_order_idx" ON "_homepage_v_version_club_spa_facts" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_club_spa_facts_parent_id_idx" ON "_homepage_v_version_club_spa_facts" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_club_spa_facts_locale_idx" ON "_homepage_v_version_club_spa_facts" USING btree ("_locale");
  CREATE INDEX "fitness_club_sessions_order_idx" ON "fitness_club_sessions" USING btree ("_order");
  CREATE INDEX "fitness_club_sessions_parent_id_idx" ON "fitness_club_sessions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "fitness_club_sessions_locales_locale_parent_id_unique" ON "fitness_club_sessions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "fitness_club_sessions_locales_parent_id_idx" ON "fitness_club_sessions_locales" USING btree ("_parent_id");
  CREATE INDEX "fitness_club_plans_includes_order_idx" ON "fitness_club_plans_includes" USING btree ("_order");
  CREATE INDEX "fitness_club_plans_includes_parent_id_idx" ON "fitness_club_plans_includes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "fitness_club_plans_includes_locales_locale_parent_id_unique" ON "fitness_club_plans_includes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "fitness_club_plans_includes_locales_parent_id_idx" ON "fitness_club_plans_includes_locales" USING btree ("_parent_id");
  CREATE INDEX "fitness_club_plans_order_idx" ON "fitness_club_plans" USING btree ("_order");
  CREATE INDEX "fitness_club_plans_parent_id_idx" ON "fitness_club_plans" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "fitness_club_plans_locales_locale_parent_id_unique" ON "fitness_club_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "fitness_club_plans_locales_parent_id_idx" ON "fitness_club_plans_locales" USING btree ("_parent_id");
  CREATE INDEX "fitness_club__status_idx" ON "fitness_club" USING btree ("_status");
  CREATE UNIQUE INDEX "fitness_club_locales_locale_parent_id_unique" ON "fitness_club_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "fitness_club_locales_parent_id_idx" ON "fitness_club_locales" USING btree ("_parent_id");
  CREATE INDEX "_fitness_club_v_version_sessions_order_idx" ON "_fitness_club_v_version_sessions" USING btree ("_order");
  CREATE INDEX "_fitness_club_v_version_sessions_parent_id_idx" ON "_fitness_club_v_version_sessions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_fitness_club_v_version_sessions_locales_locale_parent_id_un" ON "_fitness_club_v_version_sessions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_fitness_club_v_version_sessions_locales_parent_id_idx" ON "_fitness_club_v_version_sessions_locales" USING btree ("_parent_id");
  CREATE INDEX "_fitness_club_v_version_plans_includes_order_idx" ON "_fitness_club_v_version_plans_includes" USING btree ("_order");
  CREATE INDEX "_fitness_club_v_version_plans_includes_parent_id_idx" ON "_fitness_club_v_version_plans_includes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_fitness_club_v_version_plans_includes_locales_locale_parent" ON "_fitness_club_v_version_plans_includes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_fitness_club_v_version_plans_includes_locales_parent_id_idx" ON "_fitness_club_v_version_plans_includes_locales" USING btree ("_parent_id");
  CREATE INDEX "_fitness_club_v_version_plans_order_idx" ON "_fitness_club_v_version_plans" USING btree ("_order");
  CREATE INDEX "_fitness_club_v_version_plans_parent_id_idx" ON "_fitness_club_v_version_plans" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_fitness_club_v_version_plans_locales_locale_parent_id_uniqu" ON "_fitness_club_v_version_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_fitness_club_v_version_plans_locales_parent_id_idx" ON "_fitness_club_v_version_plans_locales" USING btree ("_parent_id");
  CREATE INDEX "_fitness_club_v_version_version__status_idx" ON "_fitness_club_v" USING btree ("version__status");
  CREATE INDEX "_fitness_club_v_created_at_idx" ON "_fitness_club_v" USING btree ("created_at");
  CREATE INDEX "_fitness_club_v_updated_at_idx" ON "_fitness_club_v" USING btree ("updated_at");
  CREATE INDEX "_fitness_club_v_snapshot_idx" ON "_fitness_club_v" USING btree ("snapshot");
  CREATE INDEX "_fitness_club_v_published_locale_idx" ON "_fitness_club_v" USING btree ("published_locale");
  CREATE INDEX "_fitness_club_v_latest_idx" ON "_fitness_club_v" USING btree ("latest");
  CREATE INDEX "_fitness_club_v_autosave_idx" ON "_fitness_club_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_fitness_club_v_locales_locale_parent_id_unique" ON "_fitness_club_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_fitness_club_v_locales_parent_id_idx" ON "_fitness_club_v_locales" USING btree ("_parent_id");
  CREATE INDEX "day_spa_categories_items_includes_order_idx" ON "day_spa_categories_items_includes" USING btree ("_order");
  CREATE INDEX "day_spa_categories_items_includes_parent_id_idx" ON "day_spa_categories_items_includes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "day_spa_categories_items_includes_locales_locale_parent_id_u" ON "day_spa_categories_items_includes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "day_spa_categories_items_includes_locales_parent_id_idx" ON "day_spa_categories_items_includes_locales" USING btree ("_parent_id");
  CREATE INDEX "day_spa_categories_items_order_idx" ON "day_spa_categories_items" USING btree ("_order");
  CREATE INDEX "day_spa_categories_items_parent_id_idx" ON "day_spa_categories_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "day_spa_categories_items_locales_locale_parent_id_unique" ON "day_spa_categories_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "day_spa_categories_items_locales_parent_id_idx" ON "day_spa_categories_items_locales" USING btree ("_parent_id");
  CREATE INDEX "day_spa_categories_order_idx" ON "day_spa_categories" USING btree ("_order");
  CREATE INDEX "day_spa_categories_parent_id_idx" ON "day_spa_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "day_spa_categories_locales_locale_parent_id_unique" ON "day_spa_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "day_spa_categories_locales_parent_id_idx" ON "day_spa_categories_locales" USING btree ("_parent_id");
  CREATE INDEX "day_spa__status_idx" ON "day_spa" USING btree ("_status");
  CREATE UNIQUE INDEX "day_spa_locales_locale_parent_id_unique" ON "day_spa_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "day_spa_locales_parent_id_idx" ON "day_spa_locales" USING btree ("_parent_id");
  CREATE INDEX "_day_spa_v_version_categories_items_includes_order_idx" ON "_day_spa_v_version_categories_items_includes" USING btree ("_order");
  CREATE INDEX "_day_spa_v_version_categories_items_includes_parent_id_idx" ON "_day_spa_v_version_categories_items_includes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_day_spa_v_version_categories_items_includes_locales_locale_" ON "_day_spa_v_version_categories_items_includes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_day_spa_v_version_categories_items_includes_locales_par_idx" ON "_day_spa_v_version_categories_items_includes_locales" USING btree ("_parent_id");
  CREATE INDEX "_day_spa_v_version_categories_items_order_idx" ON "_day_spa_v_version_categories_items" USING btree ("_order");
  CREATE INDEX "_day_spa_v_version_categories_items_parent_id_idx" ON "_day_spa_v_version_categories_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_day_spa_v_version_categories_items_locales_locale_parent_id" ON "_day_spa_v_version_categories_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_day_spa_v_version_categories_items_locales_parent_id_idx" ON "_day_spa_v_version_categories_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_day_spa_v_version_categories_order_idx" ON "_day_spa_v_version_categories" USING btree ("_order");
  CREATE INDEX "_day_spa_v_version_categories_parent_id_idx" ON "_day_spa_v_version_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_day_spa_v_version_categories_locales_locale_parent_id_uniqu" ON "_day_spa_v_version_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_day_spa_v_version_categories_locales_parent_id_idx" ON "_day_spa_v_version_categories_locales" USING btree ("_parent_id");
  CREATE INDEX "_day_spa_v_version_version__status_idx" ON "_day_spa_v" USING btree ("version__status");
  CREATE INDEX "_day_spa_v_created_at_idx" ON "_day_spa_v" USING btree ("created_at");
  CREATE INDEX "_day_spa_v_updated_at_idx" ON "_day_spa_v" USING btree ("updated_at");
  CREATE INDEX "_day_spa_v_snapshot_idx" ON "_day_spa_v" USING btree ("snapshot");
  CREATE INDEX "_day_spa_v_published_locale_idx" ON "_day_spa_v" USING btree ("published_locale");
  CREATE INDEX "_day_spa_v_latest_idx" ON "_day_spa_v" USING btree ("latest");
  CREATE INDEX "_day_spa_v_autosave_idx" ON "_day_spa_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_day_spa_v_locales_locale_parent_id_unique" ON "_day_spa_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_day_spa_v_locales_parent_id_idx" ON "_day_spa_v_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "homepage_club_fitness_facts" CASCADE;
  DROP TABLE "homepage_club_spa_facts" CASCADE;
  DROP TABLE "_homepage_v_version_club_fitness_facts" CASCADE;
  DROP TABLE "_homepage_v_version_club_spa_facts" CASCADE;
  DROP TABLE "fitness_club_sessions" CASCADE;
  DROP TABLE "fitness_club_sessions_locales" CASCADE;
  DROP TABLE "fitness_club_plans_includes" CASCADE;
  DROP TABLE "fitness_club_plans_includes_locales" CASCADE;
  DROP TABLE "fitness_club_plans" CASCADE;
  DROP TABLE "fitness_club_plans_locales" CASCADE;
  DROP TABLE "fitness_club" CASCADE;
  DROP TABLE "fitness_club_locales" CASCADE;
  DROP TABLE "_fitness_club_v_version_sessions" CASCADE;
  DROP TABLE "_fitness_club_v_version_sessions_locales" CASCADE;
  DROP TABLE "_fitness_club_v_version_plans_includes" CASCADE;
  DROP TABLE "_fitness_club_v_version_plans_includes_locales" CASCADE;
  DROP TABLE "_fitness_club_v_version_plans" CASCADE;
  DROP TABLE "_fitness_club_v_version_plans_locales" CASCADE;
  DROP TABLE "_fitness_club_v" CASCADE;
  DROP TABLE "_fitness_club_v_locales" CASCADE;
  DROP TABLE "day_spa_categories_items_includes" CASCADE;
  DROP TABLE "day_spa_categories_items_includes_locales" CASCADE;
  DROP TABLE "day_spa_categories_items" CASCADE;
  DROP TABLE "day_spa_categories_items_locales" CASCADE;
  DROP TABLE "day_spa_categories" CASCADE;
  DROP TABLE "day_spa_categories_locales" CASCADE;
  DROP TABLE "day_spa" CASCADE;
  DROP TABLE "day_spa_locales" CASCADE;
  DROP TABLE "_day_spa_v_version_categories_items_includes" CASCADE;
  DROP TABLE "_day_spa_v_version_categories_items_includes_locales" CASCADE;
  DROP TABLE "_day_spa_v_version_categories_items" CASCADE;
  DROP TABLE "_day_spa_v_version_categories_items_locales" CASCADE;
  DROP TABLE "_day_spa_v_version_categories" CASCADE;
  DROP TABLE "_day_spa_v_version_categories_locales" CASCADE;
  DROP TABLE "_day_spa_v" CASCADE;
  DROP TABLE "_day_spa_v_locales" CASCADE;
  ALTER TABLE "homepage_locales" DROP COLUMN "club_meta_left";
  ALTER TABLE "homepage_locales" DROP COLUMN "club_meta_center";
  ALTER TABLE "homepage_locales" DROP COLUMN "club_meta_right";
  ALTER TABLE "homepage_locales" DROP COLUMN "club_title";
  ALTER TABLE "homepage_locales" DROP COLUMN "club_intro";
  ALTER TABLE "homepage_locales" DROP COLUMN "club_fitness_tagline";
  ALTER TABLE "homepage_locales" DROP COLUMN "club_fitness_body";
  ALTER TABLE "homepage_locales" DROP COLUMN "club_fitness_cta";
  ALTER TABLE "homepage_locales" DROP COLUMN "club_spa_tagline";
  ALTER TABLE "homepage_locales" DROP COLUMN "club_spa_body";
  ALTER TABLE "homepage_locales" DROP COLUMN "club_spa_cta";
  ALTER TABLE "_homepage_v_locales" DROP COLUMN "version_club_meta_left";
  ALTER TABLE "_homepage_v_locales" DROP COLUMN "version_club_meta_center";
  ALTER TABLE "_homepage_v_locales" DROP COLUMN "version_club_meta_right";
  ALTER TABLE "_homepage_v_locales" DROP COLUMN "version_club_title";
  ALTER TABLE "_homepage_v_locales" DROP COLUMN "version_club_intro";
  ALTER TABLE "_homepage_v_locales" DROP COLUMN "version_club_fitness_tagline";
  ALTER TABLE "_homepage_v_locales" DROP COLUMN "version_club_fitness_body";
  ALTER TABLE "_homepage_v_locales" DROP COLUMN "version_club_fitness_cta";
  ALTER TABLE "_homepage_v_locales" DROP COLUMN "version_club_spa_tagline";
  ALTER TABLE "_homepage_v_locales" DROP COLUMN "version_club_spa_body";
  ALTER TABLE "_homepage_v_locales" DROP COLUMN "version_club_spa_cta";
  DROP TYPE "public"."enum_fitness_club_sessions_day";
  DROP TYPE "public"."enum_fitness_club_status";
  DROP TYPE "public"."enum__fitness_club_v_version_sessions_day";
  DROP TYPE "public"."enum__fitness_club_v_version_status";
  DROP TYPE "public"."enum__fitness_club_v_published_locale";
  DROP TYPE "public"."enum_day_spa_status";
  DROP TYPE "public"."enum__day_spa_v_version_status";
  DROP TYPE "public"."enum__day_spa_v_published_locale";`)
}
