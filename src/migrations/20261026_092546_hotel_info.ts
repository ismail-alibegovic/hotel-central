import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_hotel_info_hours_facility" AS ENUM('reception', 'restaurant', 'cafe', 'spa', 'pool', 'gym', 'other');
  CREATE TYPE "public"."enum_hotel_info_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__hotel_info_v_version_hours_facility" AS ENUM('reception', 'restaurant', 'cafe', 'spa', 'pool', 'gym', 'other');
  CREATE TYPE "public"."enum__hotel_info_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__hotel_info_v_published_locale" AS ENUM('en', 'bs');
  CREATE TABLE "hotel_info_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar
  );
  
  CREATE TABLE "hotel_info_phones_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "hotel_info_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"address" varchar
  );
  
  CREATE TABLE "hotel_info_emails_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "hotel_info_hours_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"closed" boolean DEFAULT false
  );
  
  CREATE TABLE "hotel_info_hours_rows_locales" (
  	"days" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "hotel_info_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"facility" "enum_hotel_info_hours_facility"
  );
  
  CREATE TABLE "hotel_info_hours_locales" (
  	"name" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "hotel_info" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"address_street" varchar,
  	"address_postal_code" varchar,
  	"address_city" varchar,
  	"_status" "enum_hotel_info_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "hotel_info_locales" (
  	"address_country" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_hotel_info_v_version_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"number" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hotel_info_v_version_phones_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_hotel_info_v_version_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"address" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hotel_info_v_version_emails_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_hotel_info_v_version_hours_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"time" varchar,
  	"closed" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hotel_info_v_version_hours_rows_locales" (
  	"days" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_hotel_info_v_version_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"facility" "enum__hotel_info_v_version_hours_facility",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hotel_info_v_version_hours_locales" (
  	"name" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_hotel_info_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_address_street" varchar,
  	"version_address_postal_code" varchar,
  	"version_address_city" varchar,
  	"version__status" "enum__hotel_info_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__hotel_info_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_hotel_info_v_locales" (
  	"version_address_country" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  ALTER TABLE "hotel_info_phones" ADD CONSTRAINT "hotel_info_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotel_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotel_info_phones_locales" ADD CONSTRAINT "hotel_info_phones_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotel_info_phones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotel_info_emails" ADD CONSTRAINT "hotel_info_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotel_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotel_info_emails_locales" ADD CONSTRAINT "hotel_info_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotel_info_emails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotel_info_hours_rows" ADD CONSTRAINT "hotel_info_hours_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotel_info_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotel_info_hours_rows_locales" ADD CONSTRAINT "hotel_info_hours_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotel_info_hours_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotel_info_hours" ADD CONSTRAINT "hotel_info_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotel_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotel_info_hours_locales" ADD CONSTRAINT "hotel_info_hours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotel_info_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotel_info_locales" ADD CONSTRAINT "hotel_info_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotel_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotel_info_v_version_phones" ADD CONSTRAINT "_hotel_info_v_version_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotel_info_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotel_info_v_version_phones_locales" ADD CONSTRAINT "_hotel_info_v_version_phones_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotel_info_v_version_phones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotel_info_v_version_emails" ADD CONSTRAINT "_hotel_info_v_version_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotel_info_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotel_info_v_version_emails_locales" ADD CONSTRAINT "_hotel_info_v_version_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotel_info_v_version_emails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotel_info_v_version_hours_rows" ADD CONSTRAINT "_hotel_info_v_version_hours_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotel_info_v_version_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotel_info_v_version_hours_rows_locales" ADD CONSTRAINT "_hotel_info_v_version_hours_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotel_info_v_version_hours_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotel_info_v_version_hours" ADD CONSTRAINT "_hotel_info_v_version_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotel_info_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotel_info_v_version_hours_locales" ADD CONSTRAINT "_hotel_info_v_version_hours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotel_info_v_version_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotel_info_v_locales" ADD CONSTRAINT "_hotel_info_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotel_info_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hotel_info_phones_order_idx" ON "hotel_info_phones" USING btree ("_order");
  CREATE INDEX "hotel_info_phones_parent_id_idx" ON "hotel_info_phones" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "hotel_info_phones_locales_locale_parent_id_unique" ON "hotel_info_phones_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "hotel_info_phones_locales_parent_id_idx" ON "hotel_info_phones_locales" USING btree ("_parent_id");
  CREATE INDEX "hotel_info_emails_order_idx" ON "hotel_info_emails" USING btree ("_order");
  CREATE INDEX "hotel_info_emails_parent_id_idx" ON "hotel_info_emails" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "hotel_info_emails_locales_locale_parent_id_unique" ON "hotel_info_emails_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "hotel_info_emails_locales_parent_id_idx" ON "hotel_info_emails_locales" USING btree ("_parent_id");
  CREATE INDEX "hotel_info_hours_rows_order_idx" ON "hotel_info_hours_rows" USING btree ("_order");
  CREATE INDEX "hotel_info_hours_rows_parent_id_idx" ON "hotel_info_hours_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "hotel_info_hours_rows_locales_locale_parent_id_unique" ON "hotel_info_hours_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "hotel_info_hours_rows_locales_parent_id_idx" ON "hotel_info_hours_rows_locales" USING btree ("_parent_id");
  CREATE INDEX "hotel_info_hours_order_idx" ON "hotel_info_hours" USING btree ("_order");
  CREATE INDEX "hotel_info_hours_parent_id_idx" ON "hotel_info_hours" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "hotel_info_hours_locales_locale_parent_id_unique" ON "hotel_info_hours_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "hotel_info_hours_locales_parent_id_idx" ON "hotel_info_hours_locales" USING btree ("_parent_id");
  CREATE INDEX "hotel_info__status_idx" ON "hotel_info" USING btree ("_status");
  CREATE UNIQUE INDEX "hotel_info_locales_locale_parent_id_unique" ON "hotel_info_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "hotel_info_locales_parent_id_idx" ON "hotel_info_locales" USING btree ("_parent_id");
  CREATE INDEX "_hotel_info_v_version_phones_order_idx" ON "_hotel_info_v_version_phones" USING btree ("_order");
  CREATE INDEX "_hotel_info_v_version_phones_parent_id_idx" ON "_hotel_info_v_version_phones" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_hotel_info_v_version_phones_locales_locale_parent_id_unique" ON "_hotel_info_v_version_phones_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_hotel_info_v_version_phones_locales_parent_id_idx" ON "_hotel_info_v_version_phones_locales" USING btree ("_parent_id");
  CREATE INDEX "_hotel_info_v_version_emails_order_idx" ON "_hotel_info_v_version_emails" USING btree ("_order");
  CREATE INDEX "_hotel_info_v_version_emails_parent_id_idx" ON "_hotel_info_v_version_emails" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_hotel_info_v_version_emails_locales_locale_parent_id_unique" ON "_hotel_info_v_version_emails_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_hotel_info_v_version_emails_locales_parent_id_idx" ON "_hotel_info_v_version_emails_locales" USING btree ("_parent_id");
  CREATE INDEX "_hotel_info_v_version_hours_rows_order_idx" ON "_hotel_info_v_version_hours_rows" USING btree ("_order");
  CREATE INDEX "_hotel_info_v_version_hours_rows_parent_id_idx" ON "_hotel_info_v_version_hours_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_hotel_info_v_version_hours_rows_locales_locale_parent_id_un" ON "_hotel_info_v_version_hours_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_hotel_info_v_version_hours_rows_locales_parent_id_idx" ON "_hotel_info_v_version_hours_rows_locales" USING btree ("_parent_id");
  CREATE INDEX "_hotel_info_v_version_hours_order_idx" ON "_hotel_info_v_version_hours" USING btree ("_order");
  CREATE INDEX "_hotel_info_v_version_hours_parent_id_idx" ON "_hotel_info_v_version_hours" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_hotel_info_v_version_hours_locales_locale_parent_id_unique" ON "_hotel_info_v_version_hours_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_hotel_info_v_version_hours_locales_parent_id_idx" ON "_hotel_info_v_version_hours_locales" USING btree ("_parent_id");
  CREATE INDEX "_hotel_info_v_version_version__status_idx" ON "_hotel_info_v" USING btree ("version__status");
  CREATE INDEX "_hotel_info_v_created_at_idx" ON "_hotel_info_v" USING btree ("created_at");
  CREATE INDEX "_hotel_info_v_updated_at_idx" ON "_hotel_info_v" USING btree ("updated_at");
  CREATE INDEX "_hotel_info_v_snapshot_idx" ON "_hotel_info_v" USING btree ("snapshot");
  CREATE INDEX "_hotel_info_v_published_locale_idx" ON "_hotel_info_v" USING btree ("published_locale");
  CREATE INDEX "_hotel_info_v_latest_idx" ON "_hotel_info_v" USING btree ("latest");
  CREATE INDEX "_hotel_info_v_autosave_idx" ON "_hotel_info_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_hotel_info_v_locales_locale_parent_id_unique" ON "_hotel_info_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_hotel_info_v_locales_parent_id_idx" ON "_hotel_info_v_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "hotel_info_phones" CASCADE;
  DROP TABLE "hotel_info_phones_locales" CASCADE;
  DROP TABLE "hotel_info_emails" CASCADE;
  DROP TABLE "hotel_info_emails_locales" CASCADE;
  DROP TABLE "hotel_info_hours_rows" CASCADE;
  DROP TABLE "hotel_info_hours_rows_locales" CASCADE;
  DROP TABLE "hotel_info_hours" CASCADE;
  DROP TABLE "hotel_info_hours_locales" CASCADE;
  DROP TABLE "hotel_info" CASCADE;
  DROP TABLE "hotel_info_locales" CASCADE;
  DROP TABLE "_hotel_info_v_version_phones" CASCADE;
  DROP TABLE "_hotel_info_v_version_phones_locales" CASCADE;
  DROP TABLE "_hotel_info_v_version_emails" CASCADE;
  DROP TABLE "_hotel_info_v_version_emails_locales" CASCADE;
  DROP TABLE "_hotel_info_v_version_hours_rows" CASCADE;
  DROP TABLE "_hotel_info_v_version_hours_rows_locales" CASCADE;
  DROP TABLE "_hotel_info_v_version_hours" CASCADE;
  DROP TABLE "_hotel_info_v_version_hours_locales" CASCADE;
  DROP TABLE "_hotel_info_v" CASCADE;
  DROP TABLE "_hotel_info_v_locales" CASCADE;
  DROP TYPE "public"."enum_hotel_info_hours_facility";
  DROP TYPE "public"."enum_hotel_info_status";
  DROP TYPE "public"."enum__hotel_info_v_version_hours_facility";
  DROP TYPE "public"."enum__hotel_info_v_version_status";
  DROP TYPE "public"."enum__hotel_info_v_published_locale";`)
}
