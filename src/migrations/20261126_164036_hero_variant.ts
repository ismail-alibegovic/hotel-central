import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('warm');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('warm');
  CREATE TYPE "public"."enum_custom_pages_blocks_hero_variant" AS ENUM('warm');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_hero_variant" AS ENUM('warm');
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "variant" "enum_pages_blocks_hero_variant";
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "variant" "enum__pages_v_blocks_hero_variant";
  ALTER TABLE "custom_pages_blocks_hero" ADD COLUMN "variant" "enum_custom_pages_blocks_hero_variant";
  ALTER TABLE "_custom_pages_v_blocks_hero" ADD COLUMN "variant" "enum__custom_pages_v_blocks_hero_variant";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" DROP COLUMN "variant";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "variant";
  ALTER TABLE "custom_pages_blocks_hero" DROP COLUMN "variant";
  ALTER TABLE "_custom_pages_v_blocks_hero" DROP COLUMN "variant";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum_custom_pages_blocks_hero_variant";
  DROP TYPE "public"."enum__custom_pages_v_blocks_hero_variant";`)
}
