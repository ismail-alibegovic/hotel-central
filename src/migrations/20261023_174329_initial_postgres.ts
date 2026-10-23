import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'bs');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_pages_blocks_hero_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_pages_blocks_split_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum_pages_blocks_split_line" AS ENUM('hotel', 'rooms', 'spa', 'restaurant', 'location');
  CREATE TYPE "public"."enum_pages_blocks_split_image1_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_pages_blocks_split_image2_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_pages_blocks_split_primary_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum_pages_blocks_split_secondary_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum_pages_blocks_statement_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_pages_blocks_gallery_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum_pages_blocks_final_booking_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_pages_blocks_offers_items_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_pages_blocks_offers_items_cta_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum_pages_blocks_offers_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum_pages_blocks_faq_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum_pages_blocks_cta_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum_pages_blocks_cta_primary_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum_pages_blocks_cta_secondary_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum_pages_og_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__pages_v_blocks_split_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum__pages_v_blocks_split_line" AS ENUM('hotel', 'rooms', 'spa', 'restaurant', 'location');
  CREATE TYPE "public"."enum__pages_v_blocks_split_image1_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__pages_v_blocks_split_image2_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__pages_v_blocks_split_primary_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum__pages_v_blocks_split_secondary_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__pages_v_blocks_offers_items_cta_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum__pages_v_blocks_offers_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_primary_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_secondary_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum__pages_v_version_og_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'bs');
  CREATE TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_custom_pages_blocks_split_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum_custom_pages_blocks_split_line" AS ENUM('hotel', 'rooms', 'spa', 'restaurant', 'location');
  CREATE TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_custom_pages_blocks_split_primary_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum_custom_pages_blocks_split_secondary_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum_custom_pages_blocks_statement_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_custom_pages_blocks_gallery_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_custom_pages_blocks_offers_items_cta_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum_custom_pages_blocks_offers_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum_custom_pages_blocks_faq_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum_custom_pages_blocks_cta_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum_custom_pages_blocks_cta_primary_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum_custom_pages_blocks_cta_secondary_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum_custom_pages_og_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_custom_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_split_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_split_line" AS ENUM('hotel', 'rooms', 'spa', 'restaurant', 'location');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_split_primary_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_split_secondary_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_statement_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_gallery_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_offers_items_cta_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_offers_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_faq_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_cta_tone" AS ENUM('ivory', 'deep', 'olive', 'sage', 'ink');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_cta_primary_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum__custom_pages_v_blocks_cta_secondary_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum__custom_pages_v_version_og_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__custom_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__custom_pages_v_published_locale" AS ENUM('en', 'bs');
  CREATE TYPE "public"."enum_rooms_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__rooms_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__rooms_v_published_locale" AS ENUM('en', 'bs');
  CREATE TYPE "public"."enum_navigation_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__navigation_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__navigation_v_published_locale" AS ENUM('en', 'bs');
  CREATE TYPE "public"."enum_footer_social_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum_footer_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_v_version_social_link_kind" AS ENUM('internal', 'external', 'phone', 'email');
  CREATE TYPE "public"."enum__footer_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_v_published_locale" AS ENUM('en', 'bs');
  CREATE TYPE "public"."enum_homepage_og_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_homepage_hero_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_homepage_hotel_image_left_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_homepage_hotel_image_center_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_homepage_hotel_image_right_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_homepage_spa_image_main_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_homepage_spa_image_secondary_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_homepage_restaurant_image_main_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_homepage_location_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_homepage_events_image_main_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_homepage_events_image_secondary_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_homepage_final_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum_homepage_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__homepage_v_version_og_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__homepage_v_version_hero_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__homepage_v_version_location_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__homepage_v_version_events_image_main_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__homepage_v_version_final_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  CREATE TYPE "public"."enum__homepage_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__homepage_v_published_locale" AS ENUM('en', 'bs');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"credit" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_static_path" "enum_pages_blocks_hero_image_static_path",
  	"image_upload_id" uuid,
  	"image_position" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"image_alt" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"meta_left" varchar,
  	"meta_center" varchar,
  	"meta_right" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_split_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_split_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"k" varchar,
  	"v" varchar
  );
  
  CREATE TABLE "pages_blocks_split_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_pages_blocks_split_tone" DEFAULT 'ivory',
  	"reverse" boolean DEFAULT false,
  	"line" "enum_pages_blocks_split_line",
  	"image1_static_path" "enum_pages_blocks_split_image1_static_path",
  	"image1_upload_id" uuid,
  	"image1_position" varchar,
  	"image2_static_path" "enum_pages_blocks_split_image2_static_path",
  	"image2_upload_id" uuid,
  	"image2_position" varchar,
  	"primary_link_kind" "enum_pages_blocks_split_primary_link_kind",
  	"primary_link_value" varchar,
  	"secondary_link_kind" "enum_pages_blocks_split_secondary_link_kind",
  	"secondary_link_value" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_split_locales" (
  	"label" varchar,
  	"index" varchar,
  	"title" varchar,
  	"image1_alt" varchar,
  	"image2_alt" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"bullets_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_facts_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"k" varchar,
  	"v" varchar
  );
  
  CREATE TABLE "pages_blocks_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_facts_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_pages_blocks_statement_tone" DEFAULT 'ivory',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_statement_locales" (
  	"text" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_static_path" "enum_pages_blocks_gallery_images_image_static_path",
  	"image_upload_id" uuid,
  	"image_position" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_images_locales" (
  	"image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_pages_blocks_gallery_tone" DEFAULT 'ivory',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_final_booking" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_static_path" "enum_pages_blocks_final_booking_image_static_path",
  	"image_upload_id" uuid,
  	"image_position" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_final_booking_locales" (
  	"image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_arrival_transport" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_arrival" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_arrival_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_locales" (
  	"office_label" varchar,
  	"office_body" varchar,
  	"reservations_label" varchar,
  	"reservations_body" varchar,
  	"write_label" varchar,
  	"social_label" varchar,
  	"social_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_room_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_offers_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_static_path" "enum_pages_blocks_offers_items_image_static_path",
  	"image_upload_id" uuid,
  	"image_position" varchar,
  	"cta_use_booking" boolean DEFAULT false,
  	"cta_link_kind" "enum_pages_blocks_offers_items_cta_link_kind",
  	"cta_link_value" varchar
  );
  
  CREATE TABLE "pages_blocks_offers_items_locales" (
  	"image_alt" varchar,
  	"tag" varchar,
  	"title" varchar,
  	"description" varchar,
  	"validity" varchar,
  	"price_note" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_offers" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sample" boolean DEFAULT false,
  	"tone" "enum_pages_blocks_offers_tone" DEFAULT 'ivory',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_offers_locales" (
  	"label" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"validity_label" varchar,
  	"price_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items_locales" (
  	"q" varchar,
  	"a" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sample" boolean DEFAULT false,
  	"tone" "enum_pages_blocks_faq_tone" DEFAULT 'ivory',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_locales" (
  	"label" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sample" boolean DEFAULT false,
  	"tone" "enum_pages_blocks_cta_tone" DEFAULT 'deep',
  	"primary_use_booking" boolean DEFAULT false,
  	"primary_link_kind" "enum_pages_blocks_cta_primary_link_kind",
  	"primary_link_value" varchar,
  	"secondary_use_booking" boolean DEFAULT false,
  	"secondary_link_kind" "enum_pages_blocks_cta_secondary_link_kind",
  	"secondary_link_value" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_locales" (
  	"label" varchar,
  	"title" varchar,
  	"body" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug" varchar,
  	"og_image_static_path" "enum_pages_og_image_static_path",
  	"og_image_upload_id" uuid,
  	"og_image_position" varchar,
  	"noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"og_image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_static_path" "enum__pages_v_blocks_hero_image_static_path",
  	"image_upload_id" uuid,
  	"image_position" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_locales" (
  	"image_alt" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"meta_left" varchar,
  	"meta_center" varchar,
  	"meta_right" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_split_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"k" varchar,
  	"v" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tone" "enum__pages_v_blocks_split_tone" DEFAULT 'ivory',
  	"reverse" boolean DEFAULT false,
  	"line" "enum__pages_v_blocks_split_line",
  	"image1_static_path" "enum__pages_v_blocks_split_image1_static_path",
  	"image1_upload_id" uuid,
  	"image1_position" varchar,
  	"image2_static_path" "enum__pages_v_blocks_split_image2_static_path",
  	"image2_upload_id" uuid,
  	"image2_position" varchar,
  	"primary_link_kind" "enum__pages_v_blocks_split_primary_link_kind",
  	"primary_link_value" varchar,
  	"secondary_link_kind" "enum__pages_v_blocks_split_secondary_link_kind",
  	"secondary_link_value" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_locales" (
  	"label" varchar,
  	"index" varchar,
  	"title" varchar,
  	"image1_alt" varchar,
  	"image2_alt" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"bullets_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_facts_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"k" varchar,
  	"v" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_facts_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tone" "enum__pages_v_blocks_statement_tone" DEFAULT 'ivory',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statement_locales" (
  	"text" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_static_path" "enum__pages_v_blocks_gallery_images_image_static_path",
  	"image_upload_id" uuid,
  	"image_position" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_images_locales" (
  	"image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tone" "enum__pages_v_blocks_gallery_tone" DEFAULT 'ivory',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_final_booking" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_static_path" "enum__pages_v_blocks_final_booking_image_static_path",
  	"image_upload_id" uuid,
  	"image_position" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_final_booking_locales" (
  	"image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_arrival_transport" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_arrival" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_arrival_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_locales" (
  	"office_label" varchar,
  	"office_body" varchar,
  	"reservations_label" varchar,
  	"reservations_body" varchar,
  	"write_label" varchar,
  	"social_label" varchar,
  	"social_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_room_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_offers_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_static_path" "enum__pages_v_blocks_offers_items_image_static_path",
  	"image_upload_id" uuid,
  	"image_position" varchar,
  	"cta_use_booking" boolean DEFAULT false,
  	"cta_link_kind" "enum__pages_v_blocks_offers_items_cta_link_kind",
  	"cta_link_value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_offers_items_locales" (
  	"image_alt" varchar,
  	"tag" varchar,
  	"title" varchar,
  	"description" varchar,
  	"validity" varchar,
  	"price_note" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_offers" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"sample" boolean DEFAULT false,
  	"tone" "enum__pages_v_blocks_offers_tone" DEFAULT 'ivory',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_offers_locales" (
  	"label" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"validity_label" varchar,
  	"price_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items_locales" (
  	"q" varchar,
  	"a" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"sample" boolean DEFAULT false,
  	"tone" "enum__pages_v_blocks_faq_tone" DEFAULT 'ivory',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_locales" (
  	"label" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"sample" boolean DEFAULT false,
  	"tone" "enum__pages_v_blocks_cta_tone" DEFAULT 'deep',
  	"primary_use_booking" boolean DEFAULT false,
  	"primary_link_kind" "enum__pages_v_blocks_cta_primary_link_kind",
  	"primary_link_value" varchar,
  	"secondary_use_booking" boolean DEFAULT false,
  	"secondary_link_kind" "enum__pages_v_blocks_cta_secondary_link_kind",
  	"secondary_link_value" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_locales" (
  	"label" varchar,
  	"title" varchar,
  	"body" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_slug" varchar,
  	"version_og_image_static_path" "enum__pages_v_version_og_image_static_path",
  	"version_og_image_upload_id" uuid,
  	"version_og_image_position" varchar,
  	"version_noindex" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_og_image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "custom_pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_static_path" "enum_custom_pages_blocks_hero_image_static_path",
  	"image_upload_id" uuid,
  	"image_position" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_hero_locales" (
  	"image_alt" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"meta_left" varchar,
  	"meta_center" varchar,
  	"meta_right" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "custom_pages_blocks_split_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_split_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"k" varchar,
  	"v" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_split_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_custom_pages_blocks_split_tone" DEFAULT 'ivory',
  	"reverse" boolean DEFAULT false,
  	"line" "enum_custom_pages_blocks_split_line",
  	"image1_static_path" "enum_custom_pages_blocks_split_image1_static_path",
  	"image1_upload_id" uuid,
  	"image1_position" varchar,
  	"image2_static_path" "enum_custom_pages_blocks_split_image2_static_path",
  	"image2_upload_id" uuid,
  	"image2_position" varchar,
  	"primary_link_kind" "enum_custom_pages_blocks_split_primary_link_kind",
  	"primary_link_value" varchar,
  	"secondary_link_kind" "enum_custom_pages_blocks_split_secondary_link_kind",
  	"secondary_link_value" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_split_locales" (
  	"label" varchar,
  	"index" varchar,
  	"title" varchar,
  	"image1_alt" varchar,
  	"image2_alt" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"bullets_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "custom_pages_blocks_facts_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"k" varchar,
  	"v" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_facts_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "custom_pages_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_custom_pages_blocks_statement_tone" DEFAULT 'ivory',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_statement_locales" (
  	"text" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "custom_pages_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_static_path" "enum_custom_pages_blocks_gallery_images_image_static_path",
  	"image_upload_id" uuid,
  	"image_position" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_gallery_images_locales" (
  	"image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "custom_pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_custom_pages_blocks_gallery_tone" DEFAULT 'ivory',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_gallery_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "custom_pages_blocks_final_booking" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_static_path" "enum_custom_pages_blocks_final_booking_image_static_path",
  	"image_upload_id" uuid,
  	"image_position" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_final_booking_locales" (
  	"image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "custom_pages_blocks_arrival_transport" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_arrival" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_arrival_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "custom_pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_contact_locales" (
  	"office_label" varchar,
  	"office_body" varchar,
  	"reservations_label" varchar,
  	"reservations_body" varchar,
  	"write_label" varchar,
  	"social_label" varchar,
  	"social_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "custom_pages_blocks_room_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_offers_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_static_path" "enum_custom_pages_blocks_offers_items_image_static_path",
  	"image_upload_id" uuid,
  	"image_position" varchar,
  	"cta_use_booking" boolean DEFAULT false,
  	"cta_link_kind" "enum_custom_pages_blocks_offers_items_cta_link_kind",
  	"cta_link_value" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_offers_items_locales" (
  	"image_alt" varchar,
  	"tag" varchar,
  	"title" varchar,
  	"description" varchar,
  	"validity" varchar,
  	"price_note" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "custom_pages_blocks_offers" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sample" boolean DEFAULT false,
  	"tone" "enum_custom_pages_blocks_offers_tone" DEFAULT 'ivory',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_offers_locales" (
  	"label" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"validity_label" varchar,
  	"price_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "custom_pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "custom_pages_blocks_faq_items_locales" (
  	"q" varchar,
  	"a" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "custom_pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sample" boolean DEFAULT false,
  	"tone" "enum_custom_pages_blocks_faq_tone" DEFAULT 'ivory',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_faq_locales" (
  	"label" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "custom_pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sample" boolean DEFAULT false,
  	"tone" "enum_custom_pages_blocks_cta_tone" DEFAULT 'deep',
  	"primary_use_booking" boolean DEFAULT false,
  	"primary_link_kind" "enum_custom_pages_blocks_cta_primary_link_kind",
  	"primary_link_value" varchar,
  	"secondary_use_booking" boolean DEFAULT false,
  	"secondary_link_kind" "enum_custom_pages_blocks_cta_secondary_link_kind",
  	"secondary_link_value" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_pages_blocks_cta_locales" (
  	"label" varchar,
  	"title" varchar,
  	"body" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "custom_pages" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"og_image_static_path" "enum_custom_pages_og_image_static_path",
  	"og_image_upload_id" uuid,
  	"og_image_position" varchar,
  	"noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_custom_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "custom_pages_locales" (
  	"title" varchar,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"og_image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_custom_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_static_path" "enum__custom_pages_v_blocks_hero_image_static_path",
  	"image_upload_id" uuid,
  	"image_position" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_hero_locales" (
  	"image_alt" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"meta_left" varchar,
  	"meta_center" varchar,
  	"meta_right" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_custom_pages_v_blocks_split_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_split_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"k" varchar,
  	"v" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_split_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tone" "enum__custom_pages_v_blocks_split_tone" DEFAULT 'ivory',
  	"reverse" boolean DEFAULT false,
  	"line" "enum__custom_pages_v_blocks_split_line",
  	"image1_static_path" "enum__custom_pages_v_blocks_split_image1_static_path",
  	"image1_upload_id" uuid,
  	"image1_position" varchar,
  	"image2_static_path" "enum__custom_pages_v_blocks_split_image2_static_path",
  	"image2_upload_id" uuid,
  	"image2_position" varchar,
  	"primary_link_kind" "enum__custom_pages_v_blocks_split_primary_link_kind",
  	"primary_link_value" varchar,
  	"secondary_link_kind" "enum__custom_pages_v_blocks_split_secondary_link_kind",
  	"secondary_link_value" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_split_locales" (
  	"label" varchar,
  	"index" varchar,
  	"title" varchar,
  	"image1_alt" varchar,
  	"image2_alt" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"bullets_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_custom_pages_v_blocks_facts_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"k" varchar,
  	"v" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_facts_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_custom_pages_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tone" "enum__custom_pages_v_blocks_statement_tone" DEFAULT 'ivory',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_statement_locales" (
  	"text" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_custom_pages_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_static_path" "enum__custom_pages_v_blocks_gallery_images_image_static_path",
  	"image_upload_id" uuid,
  	"image_position" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_gallery_images_locales" (
  	"image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_custom_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tone" "enum__custom_pages_v_blocks_gallery_tone" DEFAULT 'ivory',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_gallery_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_custom_pages_v_blocks_final_booking" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_static_path" "enum__custom_pages_v_blocks_final_booking_image_static_path",
  	"image_upload_id" uuid,
  	"image_position" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_final_booking_locales" (
  	"image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_custom_pages_v_blocks_arrival_transport" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_arrival" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_arrival_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_custom_pages_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_contact_locales" (
  	"office_label" varchar,
  	"office_body" varchar,
  	"reservations_label" varchar,
  	"reservations_body" varchar,
  	"write_label" varchar,
  	"social_label" varchar,
  	"social_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_custom_pages_v_blocks_room_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_offers_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_static_path" "enum__custom_pages_v_blocks_offers_items_image_static_path",
  	"image_upload_id" uuid,
  	"image_position" varchar,
  	"cta_use_booking" boolean DEFAULT false,
  	"cta_link_kind" "enum__custom_pages_v_blocks_offers_items_cta_link_kind",
  	"cta_link_value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_offers_items_locales" (
  	"image_alt" varchar,
  	"tag" varchar,
  	"title" varchar,
  	"description" varchar,
  	"validity" varchar,
  	"price_note" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_custom_pages_v_blocks_offers" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"sample" boolean DEFAULT false,
  	"tone" "enum__custom_pages_v_blocks_offers_tone" DEFAULT 'ivory',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_offers_locales" (
  	"label" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"validity_label" varchar,
  	"price_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_custom_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_faq_items_locales" (
  	"q" varchar,
  	"a" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_custom_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"sample" boolean DEFAULT false,
  	"tone" "enum__custom_pages_v_blocks_faq_tone" DEFAULT 'ivory',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_faq_locales" (
  	"label" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_custom_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"sample" boolean DEFAULT false,
  	"tone" "enum__custom_pages_v_blocks_cta_tone" DEFAULT 'deep',
  	"primary_use_booking" boolean DEFAULT false,
  	"primary_link_kind" "enum__custom_pages_v_blocks_cta_primary_link_kind",
  	"primary_link_value" varchar,
  	"secondary_use_booking" boolean DEFAULT false,
  	"secondary_link_kind" "enum__custom_pages_v_blocks_cta_secondary_link_kind",
  	"secondary_link_value" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_pages_v_blocks_cta_locales" (
  	"label" varchar,
  	"title" varchar,
  	"body" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_custom_pages_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_og_image_static_path" "enum__custom_pages_v_version_og_image_static_path",
  	"version_og_image_upload_id" uuid,
  	"version_og_image_position" varchar,
  	"version_noindex" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__custom_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__custom_pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_custom_pages_v_locales" (
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_og_image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "rooms_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "rooms_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "rooms_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "rooms_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid
  );
  
  CREATE TABLE "rooms" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug" varchar,
  	"room_type_id" varchar,
  	"size_m2" numeric,
  	"order" numeric,
  	"visible" boolean DEFAULT true,
  	"noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_rooms_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "rooms_locales" (
  	"name" varchar,
  	"title_lines" varchar,
  	"feature" varchar,
  	"size_label" varchar,
  	"summary" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_rooms_v_version_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_rooms_v_version_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_rooms_v_version_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_rooms_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_rooms_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_slug" varchar,
  	"version_room_type_id" varchar,
  	"version_size_m2" numeric,
  	"version_order" numeric,
  	"version_visible" boolean DEFAULT true,
  	"version_noindex" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__rooms_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__rooms_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_rooms_v_locales" (
  	"version_name" varchar,
  	"version_title_lines" varchar,
  	"version_feature" varchar,
  	"version_size_label" varchar,
  	"version_summary" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid,
  	"media_id" uuid,
  	"pages_id" uuid,
  	"custom_pages_id" uuid,
  	"rooms_id" uuid
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true
  );
  
  CREATE TABLE "navigation_items_locales" (
  	"label" varchar,
  	"path" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_status" "enum_navigation_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_locales" (
  	"menu_label" varchar,
  	"close_label" varchar,
  	"rooms_label" varchar,
  	"book_label" varchar,
  	"skip_label" varchar,
  	"language_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_navigation_v_version_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"visible" boolean DEFAULT true,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_navigation_v_version_items_locales" (
  	"label" varchar,
  	"path" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_navigation_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version__status" "enum__navigation_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__navigation_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_navigation_v_locales" (
  	"version_menu_label" varchar,
  	"version_close_label" varchar,
  	"version_rooms_label" varchar,
  	"version_book_label" varchar,
  	"version_skip_label" varchar,
  	"version_language_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "footer_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_kind" "enum_footer_social_link_kind",
  	"link_value" varchar
  );
  
  CREATE TABLE "footer" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_status" "enum_footer_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"reservations" varchar,
  	"reservations_body" varchar,
  	"statement" varchar,
  	"address_label" varchar,
  	"contact_label" varchar,
  	"explore_label" varchar,
  	"follow_label" varchar,
  	"rights" varchar,
  	"credits" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_footer_v_version_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"label" varchar,
  	"link_kind" "enum__footer_v_version_social_link_kind",
  	"link_value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version__status" "enum__footer_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__footer_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_footer_v_locales" (
  	"version_reservations" varchar,
  	"version_reservations_body" varchar,
  	"version_statement" varchar,
  	"version_address_label" varchar,
  	"version_contact_label" varchar,
  	"version_explore_label" varchar,
  	"version_follow_label" varchar,
  	"version_rights" varchar,
  	"version_credits" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "homepage_spa_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "homepage_location_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"k" varchar,
  	"v" varchar
  );
  
  CREATE TABLE "homepage" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"og_image_static_path" "enum_homepage_og_image_static_path",
  	"og_image_upload_id" uuid,
  	"og_image_position" varchar,
  	"hero_image_static_path" "enum_homepage_hero_image_static_path",
  	"hero_image_upload_id" uuid,
  	"hero_image_position" varchar,
  	"hotel_image_left_static_path" "enum_homepage_hotel_image_left_static_path",
  	"hotel_image_left_upload_id" uuid,
  	"hotel_image_left_position" varchar,
  	"hotel_image_center_static_path" "enum_homepage_hotel_image_center_static_path",
  	"hotel_image_center_upload_id" uuid,
  	"hotel_image_center_position" varchar,
  	"hotel_image_right_static_path" "enum_homepage_hotel_image_right_static_path",
  	"hotel_image_right_upload_id" uuid,
  	"hotel_image_right_position" varchar,
  	"spa_image_main_static_path" "enum_homepage_spa_image_main_static_path",
  	"spa_image_main_upload_id" uuid,
  	"spa_image_main_position" varchar,
  	"spa_image_secondary_static_path" "enum_homepage_spa_image_secondary_static_path",
  	"spa_image_secondary_upload_id" uuid,
  	"spa_image_secondary_position" varchar,
  	"restaurant_image_main_static_path" "enum_homepage_restaurant_image_main_static_path",
  	"restaurant_image_main_upload_id" uuid,
  	"restaurant_image_main_position" varchar,
  	"restaurant_image_coffee_static_path" "enum_homepage_restaurant_image_coffee_static_path",
  	"restaurant_image_coffee_upload_id" uuid,
  	"restaurant_image_coffee_position" varchar,
  	"restaurant_image_buffet_static_path" "enum_homepage_restaurant_image_buffet_static_path",
  	"restaurant_image_buffet_upload_id" uuid,
  	"restaurant_image_buffet_position" varchar,
  	"location_image_static_path" "enum_homepage_location_image_static_path",
  	"location_image_upload_id" uuid,
  	"location_image_position" varchar,
  	"events_image_main_static_path" "enum_homepage_events_image_main_static_path",
  	"events_image_main_upload_id" uuid,
  	"events_image_main_position" varchar,
  	"events_image_secondary_static_path" "enum_homepage_events_image_secondary_static_path",
  	"events_image_secondary_upload_id" uuid,
  	"events_image_secondary_position" varchar,
  	"final_image_static_path" "enum_homepage_final_image_static_path",
  	"final_image_upload_id" uuid,
  	"final_image_position" varchar,
  	"_status" "enum_homepage_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"og_image_alt" varchar,
  	"hero_label" varchar,
  	"hero_title" varchar,
  	"hero_tagline" varchar,
  	"hero_note" varchar,
  	"hero_image_alt" varchar,
  	"hotel_meta_left" varchar,
  	"hotel_meta_center" varchar,
  	"hotel_meta_index" varchar,
  	"hotel_meta_right" varchar,
  	"hotel_meta_right_sub" varchar,
  	"hotel_title" varchar,
  	"hotel_body" varchar,
  	"hotel_cta" varchar,
  	"hotel_image_left_alt" varchar,
  	"hotel_image_center_alt" varchar,
  	"hotel_image_right_alt" varchar,
  	"rooms_meta_left" varchar,
  	"rooms_meta_center" varchar,
  	"rooms_meta_index" varchar,
  	"rooms_meta_right" varchar,
  	"rooms_body" varchar,
  	"spa_meta_left" varchar,
  	"spa_meta_center" varchar,
  	"spa_meta_right" varchar,
  	"spa_title" varchar,
  	"spa_body" varchar,
  	"spa_cta" varchar,
  	"spa_image_main_alt" varchar,
  	"spa_image_secondary_alt" varchar,
  	"restaurant_meta_left" varchar,
  	"restaurant_meta_center" varchar,
  	"restaurant_meta_right" varchar,
  	"restaurant_title" varchar,
  	"restaurant_body" varchar,
  	"restaurant_body2" varchar,
  	"restaurant_cta" varchar,
  	"restaurant_image_main_alt" varchar,
  	"restaurant_image_coffee_alt" varchar,
  	"restaurant_image_buffet_alt" varchar,
  	"location_meta_left" varchar,
  	"location_meta_center" varchar,
  	"location_meta_right" varchar,
  	"location_title" varchar,
  	"location_body" varchar,
  	"location_cta" varchar,
  	"location_image_alt" varchar,
  	"events_meta_left" varchar,
  	"events_meta_center" varchar,
  	"events_meta_right" varchar,
  	"events_title" varchar,
  	"events_body" varchar,
  	"events_cta" varchar,
  	"events_image_main_alt" varchar,
  	"events_image_secondary_alt" varchar,
  	"final_label" varchar,
  	"final_title" varchar,
  	"final_body" varchar,
  	"final_cta" varchar,
  	"final_image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_homepage_v_version_spa_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_version_location_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"k" varchar,
  	"v" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_og_image_static_path" "enum__homepage_v_version_og_image_static_path",
  	"version_og_image_upload_id" uuid,
  	"version_og_image_position" varchar,
  	"version_hero_image_static_path" "enum__homepage_v_version_hero_image_static_path",
  	"version_hero_image_upload_id" uuid,
  	"version_hero_image_position" varchar,
  	"version_hotel_image_left_static_path" "enum__homepage_v_version_hotel_image_left_static_path",
  	"version_hotel_image_left_upload_id" uuid,
  	"version_hotel_image_left_position" varchar,
  	"version_hotel_image_center_static_path" "enum__homepage_v_version_hotel_image_center_static_path",
  	"version_hotel_image_center_upload_id" uuid,
  	"version_hotel_image_center_position" varchar,
  	"version_hotel_image_right_static_path" "enum__homepage_v_version_hotel_image_right_static_path",
  	"version_hotel_image_right_upload_id" uuid,
  	"version_hotel_image_right_position" varchar,
  	"version_spa_image_main_static_path" "enum__homepage_v_version_spa_image_main_static_path",
  	"version_spa_image_main_upload_id" uuid,
  	"version_spa_image_main_position" varchar,
  	"version_spa_image_secondary_static_path" "enum__homepage_v_version_spa_image_secondary_static_path",
  	"version_spa_image_secondary_upload_id" uuid,
  	"version_spa_image_secondary_position" varchar,
  	"version_restaurant_image_main_static_path" "enum__homepage_v_version_restaurant_image_main_static_path",
  	"version_restaurant_image_main_upload_id" uuid,
  	"version_restaurant_image_main_position" varchar,
  	"version_restaurant_image_coffee_static_path" "enum__homepage_v_version_restaurant_image_coffee_static_path",
  	"version_restaurant_image_coffee_upload_id" uuid,
  	"version_restaurant_image_coffee_position" varchar,
  	"version_restaurant_image_buffet_static_path" "enum__homepage_v_version_restaurant_image_buffet_static_path",
  	"version_restaurant_image_buffet_upload_id" uuid,
  	"version_restaurant_image_buffet_position" varchar,
  	"version_location_image_static_path" "enum__homepage_v_version_location_image_static_path",
  	"version_location_image_upload_id" uuid,
  	"version_location_image_position" varchar,
  	"version_events_image_main_static_path" "enum__homepage_v_version_events_image_main_static_path",
  	"version_events_image_main_upload_id" uuid,
  	"version_events_image_main_position" varchar,
  	"version_events_image_secondary_static_path" "enum__homepage_v_version_events_image_secondary_static_path",
  	"version_events_image_secondary_upload_id" uuid,
  	"version_events_image_secondary_position" varchar,
  	"version_final_image_static_path" "enum__homepage_v_version_final_image_static_path",
  	"version_final_image_upload_id" uuid,
  	"version_final_image_position" varchar,
  	"version__status" "enum__homepage_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__homepage_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_homepage_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_og_image_alt" varchar,
  	"version_hero_label" varchar,
  	"version_hero_title" varchar,
  	"version_hero_tagline" varchar,
  	"version_hero_note" varchar,
  	"version_hero_image_alt" varchar,
  	"version_hotel_meta_left" varchar,
  	"version_hotel_meta_center" varchar,
  	"version_hotel_meta_index" varchar,
  	"version_hotel_meta_right" varchar,
  	"version_hotel_meta_right_sub" varchar,
  	"version_hotel_title" varchar,
  	"version_hotel_body" varchar,
  	"version_hotel_cta" varchar,
  	"version_hotel_image_left_alt" varchar,
  	"version_hotel_image_center_alt" varchar,
  	"version_hotel_image_right_alt" varchar,
  	"version_rooms_meta_left" varchar,
  	"version_rooms_meta_center" varchar,
  	"version_rooms_meta_index" varchar,
  	"version_rooms_meta_right" varchar,
  	"version_rooms_body" varchar,
  	"version_spa_meta_left" varchar,
  	"version_spa_meta_center" varchar,
  	"version_spa_meta_right" varchar,
  	"version_spa_title" varchar,
  	"version_spa_body" varchar,
  	"version_spa_cta" varchar,
  	"version_spa_image_main_alt" varchar,
  	"version_spa_image_secondary_alt" varchar,
  	"version_restaurant_meta_left" varchar,
  	"version_restaurant_meta_center" varchar,
  	"version_restaurant_meta_right" varchar,
  	"version_restaurant_title" varchar,
  	"version_restaurant_body" varchar,
  	"version_restaurant_body2" varchar,
  	"version_restaurant_cta" varchar,
  	"version_restaurant_image_main_alt" varchar,
  	"version_restaurant_image_coffee_alt" varchar,
  	"version_restaurant_image_buffet_alt" varchar,
  	"version_location_meta_left" varchar,
  	"version_location_meta_center" varchar,
  	"version_location_meta_right" varchar,
  	"version_location_title" varchar,
  	"version_location_body" varchar,
  	"version_location_cta" varchar,
  	"version_location_image_alt" varchar,
  	"version_events_meta_left" varchar,
  	"version_events_meta_center" varchar,
  	"version_events_meta_right" varchar,
  	"version_events_title" varchar,
  	"version_events_body" varchar,
  	"version_events_cta" varchar,
  	"version_events_image_main_alt" varchar,
  	"version_events_image_secondary_alt" varchar,
  	"version_final_label" varchar,
  	"version_final_title" varchar,
  	"version_final_body" varchar,
  	"version_final_cta" varchar,
  	"version_final_image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_upload_id_media_id_fk" FOREIGN KEY ("image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_body" ADD CONSTRAINT "pages_blocks_split_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_facts" ADD CONSTRAINT "pages_blocks_split_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_bullets" ADD CONSTRAINT "pages_blocks_split_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split" ADD CONSTRAINT "pages_blocks_split_image1_upload_id_media_id_fk" FOREIGN KEY ("image1_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_split" ADD CONSTRAINT "pages_blocks_split_image2_upload_id_media_id_fk" FOREIGN KEY ("image2_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_split" ADD CONSTRAINT "pages_blocks_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_locales" ADD CONSTRAINT "pages_blocks_split_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_facts_items" ADD CONSTRAINT "pages_blocks_facts_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_facts" ADD CONSTRAINT "pages_blocks_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_facts_locales" ADD CONSTRAINT "pages_blocks_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement" ADD CONSTRAINT "pages_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement_locales" ADD CONSTRAINT "pages_blocks_statement_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_image_upload_id_media_id_fk" FOREIGN KEY ("image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images_locales" ADD CONSTRAINT "pages_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_locales" ADD CONSTRAINT "pages_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_final_booking" ADD CONSTRAINT "pages_blocks_final_booking_image_upload_id_media_id_fk" FOREIGN KEY ("image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_final_booking" ADD CONSTRAINT "pages_blocks_final_booking_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_final_booking_locales" ADD CONSTRAINT "pages_blocks_final_booking_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_final_booking"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_arrival_transport" ADD CONSTRAINT "pages_blocks_arrival_transport_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_arrival"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_arrival" ADD CONSTRAINT "pages_blocks_arrival_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_arrival_locales" ADD CONSTRAINT "pages_blocks_arrival_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_arrival"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_locales" ADD CONSTRAINT "pages_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_room_list" ADD CONSTRAINT "pages_blocks_room_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_offers_items" ADD CONSTRAINT "pages_blocks_offers_items_image_upload_id_media_id_fk" FOREIGN KEY ("image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_offers_items" ADD CONSTRAINT "pages_blocks_offers_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_offers_items_locales" ADD CONSTRAINT "pages_blocks_offers_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_offers_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_offers" ADD CONSTRAINT "pages_blocks_offers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_offers_locales" ADD CONSTRAINT "pages_blocks_offers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items_locales" ADD CONSTRAINT "pages_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_og_image_upload_id_media_id_fk" FOREIGN KEY ("og_image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_upload_id_media_id_fk" FOREIGN KEY ("image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_body" ADD CONSTRAINT "_pages_v_blocks_split_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_facts" ADD CONSTRAINT "_pages_v_blocks_split_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_bullets" ADD CONSTRAINT "_pages_v_blocks_split_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split" ADD CONSTRAINT "_pages_v_blocks_split_image1_upload_id_media_id_fk" FOREIGN KEY ("image1_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split" ADD CONSTRAINT "_pages_v_blocks_split_image2_upload_id_media_id_fk" FOREIGN KEY ("image2_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split" ADD CONSTRAINT "_pages_v_blocks_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_locales" ADD CONSTRAINT "_pages_v_blocks_split_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_facts_items" ADD CONSTRAINT "_pages_v_blocks_facts_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_facts" ADD CONSTRAINT "_pages_v_blocks_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_facts_locales" ADD CONSTRAINT "_pages_v_blocks_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement" ADD CONSTRAINT "_pages_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement_locales" ADD CONSTRAINT "_pages_v_blocks_statement_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_image_upload_id_media_id_fk" FOREIGN KEY ("image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images_locales" ADD CONSTRAINT "_pages_v_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_locales" ADD CONSTRAINT "_pages_v_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_final_booking" ADD CONSTRAINT "_pages_v_blocks_final_booking_image_upload_id_media_id_fk" FOREIGN KEY ("image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_final_booking" ADD CONSTRAINT "_pages_v_blocks_final_booking_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_final_booking_locales" ADD CONSTRAINT "_pages_v_blocks_final_booking_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_final_booking"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_arrival_transport" ADD CONSTRAINT "_pages_v_blocks_arrival_transport_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_arrival"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_arrival" ADD CONSTRAINT "_pages_v_blocks_arrival_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_arrival_locales" ADD CONSTRAINT "_pages_v_blocks_arrival_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_arrival"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_locales" ADD CONSTRAINT "_pages_v_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_room_list" ADD CONSTRAINT "_pages_v_blocks_room_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_offers_items" ADD CONSTRAINT "_pages_v_blocks_offers_items_image_upload_id_media_id_fk" FOREIGN KEY ("image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_offers_items" ADD CONSTRAINT "_pages_v_blocks_offers_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_offers_items_locales" ADD CONSTRAINT "_pages_v_blocks_offers_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_offers_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_offers" ADD CONSTRAINT "_pages_v_blocks_offers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_offers_locales" ADD CONSTRAINT "_pages_v_blocks_offers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_locales" ADD CONSTRAINT "_pages_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD CONSTRAINT "_pages_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_og_image_upload_id_media_id_fk" FOREIGN KEY ("version_og_image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_hero" ADD CONSTRAINT "custom_pages_blocks_hero_image_upload_id_media_id_fk" FOREIGN KEY ("image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_hero" ADD CONSTRAINT "custom_pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_hero_locales" ADD CONSTRAINT "custom_pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_split_body" ADD CONSTRAINT "custom_pages_blocks_split_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_split_facts" ADD CONSTRAINT "custom_pages_blocks_split_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_split_bullets" ADD CONSTRAINT "custom_pages_blocks_split_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_split" ADD CONSTRAINT "custom_pages_blocks_split_image1_upload_id_media_id_fk" FOREIGN KEY ("image1_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_split" ADD CONSTRAINT "custom_pages_blocks_split_image2_upload_id_media_id_fk" FOREIGN KEY ("image2_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_split" ADD CONSTRAINT "custom_pages_blocks_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_split_locales" ADD CONSTRAINT "custom_pages_blocks_split_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_facts_items" ADD CONSTRAINT "custom_pages_blocks_facts_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_facts" ADD CONSTRAINT "custom_pages_blocks_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_facts_locales" ADD CONSTRAINT "custom_pages_blocks_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_statement" ADD CONSTRAINT "custom_pages_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_statement_locales" ADD CONSTRAINT "custom_pages_blocks_statement_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_gallery_images" ADD CONSTRAINT "custom_pages_blocks_gallery_images_image_upload_id_media_id_fk" FOREIGN KEY ("image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_gallery_images" ADD CONSTRAINT "custom_pages_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_gallery_images_locales" ADD CONSTRAINT "custom_pages_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_gallery" ADD CONSTRAINT "custom_pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_gallery_locales" ADD CONSTRAINT "custom_pages_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_final_booking" ADD CONSTRAINT "custom_pages_blocks_final_booking_image_upload_id_media_id_fk" FOREIGN KEY ("image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_final_booking" ADD CONSTRAINT "custom_pages_blocks_final_booking_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_final_booking_locales" ADD CONSTRAINT "custom_pages_blocks_final_booking_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_final_booking"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_arrival_transport" ADD CONSTRAINT "custom_pages_blocks_arrival_transport_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_arrival"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_arrival" ADD CONSTRAINT "custom_pages_blocks_arrival_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_arrival_locales" ADD CONSTRAINT "custom_pages_blocks_arrival_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_arrival"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_contact" ADD CONSTRAINT "custom_pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_contact_locales" ADD CONSTRAINT "custom_pages_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_room_list" ADD CONSTRAINT "custom_pages_blocks_room_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_offers_items" ADD CONSTRAINT "custom_pages_blocks_offers_items_image_upload_id_media_id_fk" FOREIGN KEY ("image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_offers_items" ADD CONSTRAINT "custom_pages_blocks_offers_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_offers_items_locales" ADD CONSTRAINT "custom_pages_blocks_offers_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_offers_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_offers" ADD CONSTRAINT "custom_pages_blocks_offers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_offers_locales" ADD CONSTRAINT "custom_pages_blocks_offers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_faq_items" ADD CONSTRAINT "custom_pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_faq_items_locales" ADD CONSTRAINT "custom_pages_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_faq" ADD CONSTRAINT "custom_pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_faq_locales" ADD CONSTRAINT "custom_pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_cta" ADD CONSTRAINT "custom_pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages_blocks_cta_locales" ADD CONSTRAINT "custom_pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_pages" ADD CONSTRAINT "custom_pages_og_image_upload_id_media_id_fk" FOREIGN KEY ("og_image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_pages_locales" ADD CONSTRAINT "custom_pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_hero" ADD CONSTRAINT "_custom_pages_v_blocks_hero_image_upload_id_media_id_fk" FOREIGN KEY ("image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_hero" ADD CONSTRAINT "_custom_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_hero_locales" ADD CONSTRAINT "_custom_pages_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_split_body" ADD CONSTRAINT "_custom_pages_v_blocks_split_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_split_facts" ADD CONSTRAINT "_custom_pages_v_blocks_split_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_split_bullets" ADD CONSTRAINT "_custom_pages_v_blocks_split_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_split" ADD CONSTRAINT "_custom_pages_v_blocks_split_image1_upload_id_media_id_fk" FOREIGN KEY ("image1_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_split" ADD CONSTRAINT "_custom_pages_v_blocks_split_image2_upload_id_media_id_fk" FOREIGN KEY ("image2_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_split" ADD CONSTRAINT "_custom_pages_v_blocks_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_split_locales" ADD CONSTRAINT "_custom_pages_v_blocks_split_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_facts_items" ADD CONSTRAINT "_custom_pages_v_blocks_facts_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_facts" ADD CONSTRAINT "_custom_pages_v_blocks_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_facts_locales" ADD CONSTRAINT "_custom_pages_v_blocks_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_statement" ADD CONSTRAINT "_custom_pages_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_statement_locales" ADD CONSTRAINT "_custom_pages_v_blocks_statement_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_gallery_images" ADD CONSTRAINT "_custom_pages_v_blocks_gallery_images_image_upload_id_media_id_fk" FOREIGN KEY ("image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_gallery_images" ADD CONSTRAINT "_custom_pages_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_gallery_images_locales" ADD CONSTRAINT "_custom_pages_v_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_gallery" ADD CONSTRAINT "_custom_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_gallery_locales" ADD CONSTRAINT "_custom_pages_v_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_final_booking" ADD CONSTRAINT "_custom_pages_v_blocks_final_booking_image_upload_id_media_id_fk" FOREIGN KEY ("image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_final_booking" ADD CONSTRAINT "_custom_pages_v_blocks_final_booking_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_final_booking_locales" ADD CONSTRAINT "_custom_pages_v_blocks_final_booking_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_final_booking"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_arrival_transport" ADD CONSTRAINT "_custom_pages_v_blocks_arrival_transport_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_arrival"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_arrival" ADD CONSTRAINT "_custom_pages_v_blocks_arrival_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_arrival_locales" ADD CONSTRAINT "_custom_pages_v_blocks_arrival_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_arrival"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_contact" ADD CONSTRAINT "_custom_pages_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_contact_locales" ADD CONSTRAINT "_custom_pages_v_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_room_list" ADD CONSTRAINT "_custom_pages_v_blocks_room_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_offers_items" ADD CONSTRAINT "_custom_pages_v_blocks_offers_items_image_upload_id_media_id_fk" FOREIGN KEY ("image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_offers_items" ADD CONSTRAINT "_custom_pages_v_blocks_offers_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_offers_items_locales" ADD CONSTRAINT "_custom_pages_v_blocks_offers_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_offers_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_offers" ADD CONSTRAINT "_custom_pages_v_blocks_offers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_offers_locales" ADD CONSTRAINT "_custom_pages_v_blocks_offers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_faq_items" ADD CONSTRAINT "_custom_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_faq_items_locales" ADD CONSTRAINT "_custom_pages_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_faq" ADD CONSTRAINT "_custom_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_faq_locales" ADD CONSTRAINT "_custom_pages_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_cta" ADD CONSTRAINT "_custom_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_blocks_cta_locales" ADD CONSTRAINT "_custom_pages_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_pages_v" ADD CONSTRAINT "_custom_pages_v_parent_id_custom_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."custom_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_pages_v" ADD CONSTRAINT "_custom_pages_v_version_og_image_upload_id_media_id_fk" FOREIGN KEY ("version_og_image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_pages_v_locales" ADD CONSTRAINT "_custom_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_description" ADD CONSTRAINT "rooms_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_highlights" ADD CONSTRAINT "rooms_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_amenities" ADD CONSTRAINT "rooms_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_gallery" ADD CONSTRAINT "rooms_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rooms_gallery" ADD CONSTRAINT "rooms_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_locales" ADD CONSTRAINT "rooms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_description" ADD CONSTRAINT "_rooms_v_version_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_highlights" ADD CONSTRAINT "_rooms_v_version_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_amenities" ADD CONSTRAINT "_rooms_v_version_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_gallery" ADD CONSTRAINT "_rooms_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_gallery" ADD CONSTRAINT "_rooms_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v" ADD CONSTRAINT "_rooms_v_parent_id_rooms_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_v_locales" ADD CONSTRAINT "_rooms_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_custom_pages_fk" FOREIGN KEY ("custom_pages_id") REFERENCES "public"."custom_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rooms_fk" FOREIGN KEY ("rooms_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_items" ADD CONSTRAINT "navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_items_locales" ADD CONSTRAINT "navigation_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_locales" ADD CONSTRAINT "navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_items" ADD CONSTRAINT "_navigation_v_version_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_items_locales" ADD CONSTRAINT "_navigation_v_version_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v_version_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_locales" ADD CONSTRAINT "_navigation_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social" ADD CONSTRAINT "footer_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_social" ADD CONSTRAINT "_footer_v_version_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_locales" ADD CONSTRAINT "_footer_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_spa_facts" ADD CONSTRAINT "homepage_spa_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_location_facts" ADD CONSTRAINT "homepage_location_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_og_image_upload_id_media_id_fk" FOREIGN KEY ("og_image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_image_upload_id_media_id_fk" FOREIGN KEY ("hero_image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hotel_image_left_upload_id_media_id_fk" FOREIGN KEY ("hotel_image_left_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hotel_image_center_upload_id_media_id_fk" FOREIGN KEY ("hotel_image_center_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hotel_image_right_upload_id_media_id_fk" FOREIGN KEY ("hotel_image_right_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_spa_image_main_upload_id_media_id_fk" FOREIGN KEY ("spa_image_main_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_spa_image_secondary_upload_id_media_id_fk" FOREIGN KEY ("spa_image_secondary_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_restaurant_image_main_upload_id_media_id_fk" FOREIGN KEY ("restaurant_image_main_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_restaurant_image_coffee_upload_id_media_id_fk" FOREIGN KEY ("restaurant_image_coffee_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_restaurant_image_buffet_upload_id_media_id_fk" FOREIGN KEY ("restaurant_image_buffet_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_location_image_upload_id_media_id_fk" FOREIGN KEY ("location_image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_events_image_main_upload_id_media_id_fk" FOREIGN KEY ("events_image_main_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_events_image_secondary_upload_id_media_id_fk" FOREIGN KEY ("events_image_secondary_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_final_image_upload_id_media_id_fk" FOREIGN KEY ("final_image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_locales" ADD CONSTRAINT "homepage_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_spa_facts" ADD CONSTRAINT "_homepage_v_version_spa_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_location_facts" ADD CONSTRAINT "_homepage_v_version_location_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_og_image_upload_id_media_id_fk" FOREIGN KEY ("version_og_image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_hero_image_upload_id_media_id_fk" FOREIGN KEY ("version_hero_image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_hotel_image_left_upload_id_media_id_fk" FOREIGN KEY ("version_hotel_image_left_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_hotel_image_center_upload_id_media_id_fk" FOREIGN KEY ("version_hotel_image_center_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_hotel_image_right_upload_id_media_id_fk" FOREIGN KEY ("version_hotel_image_right_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_spa_image_main_upload_id_media_id_fk" FOREIGN KEY ("version_spa_image_main_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_spa_image_secondary_upload_id_media_id_fk" FOREIGN KEY ("version_spa_image_secondary_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_restaurant_image_main_upload_id_media_id_fk" FOREIGN KEY ("version_restaurant_image_main_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_restaurant_image_coffee_upload_id_media_id_fk" FOREIGN KEY ("version_restaurant_image_coffee_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_restaurant_image_buffet_upload_id_media_id_fk" FOREIGN KEY ("version_restaurant_image_buffet_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_location_image_upload_id_media_id_fk" FOREIGN KEY ("version_location_image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_events_image_main_upload_id_media_id_fk" FOREIGN KEY ("version_events_image_main_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_events_image_secondary_upload_id_media_id_fk" FOREIGN KEY ("version_events_image_secondary_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_final_image_upload_id_media_id_fk" FOREIGN KEY ("version_final_image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_locales" ADD CONSTRAINT "_homepage_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_image_upload_idx" ON "pages_blocks_hero" USING btree ("image_upload_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_locales_parent_id_idx" ON "pages_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_body_order_idx" ON "pages_blocks_split_body" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_body_parent_id_idx" ON "pages_blocks_split_body" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_body_locale_idx" ON "pages_blocks_split_body" USING btree ("_locale");
  CREATE INDEX "pages_blocks_split_facts_order_idx" ON "pages_blocks_split_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_facts_parent_id_idx" ON "pages_blocks_split_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_facts_locale_idx" ON "pages_blocks_split_facts" USING btree ("_locale");
  CREATE INDEX "pages_blocks_split_bullets_order_idx" ON "pages_blocks_split_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_bullets_parent_id_idx" ON "pages_blocks_split_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_bullets_locale_idx" ON "pages_blocks_split_bullets" USING btree ("_locale");
  CREATE INDEX "pages_blocks_split_order_idx" ON "pages_blocks_split" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_parent_id_idx" ON "pages_blocks_split" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_path_idx" ON "pages_blocks_split" USING btree ("_path");
  CREATE INDEX "pages_blocks_split_image1_image1_upload_idx" ON "pages_blocks_split" USING btree ("image1_upload_id");
  CREATE INDEX "pages_blocks_split_image2_image2_upload_idx" ON "pages_blocks_split" USING btree ("image2_upload_id");
  CREATE UNIQUE INDEX "pages_blocks_split_locales_locale_parent_id_unique" ON "pages_blocks_split_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_split_locales_parent_id_idx" ON "pages_blocks_split_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_facts_items_order_idx" ON "pages_blocks_facts_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_facts_items_parent_id_idx" ON "pages_blocks_facts_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_facts_items_locale_idx" ON "pages_blocks_facts_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_facts_order_idx" ON "pages_blocks_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_facts_parent_id_idx" ON "pages_blocks_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_facts_path_idx" ON "pages_blocks_facts" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_facts_locales_locale_parent_id_unique" ON "pages_blocks_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_facts_locales_parent_id_idx" ON "pages_blocks_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_order_idx" ON "pages_blocks_statement" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_parent_id_idx" ON "pages_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_path_idx" ON "pages_blocks_statement" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_statement_locales_locale_parent_id_unique" ON "pages_blocks_statement_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_statement_locales_parent_id_idx" ON "pages_blocks_statement_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_order_idx" ON "pages_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_images_parent_id_idx" ON "pages_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_image_image_upload_idx" ON "pages_blocks_gallery_images" USING btree ("image_upload_id");
  CREATE UNIQUE INDEX "pages_blocks_gallery_images_locales_locale_parent_id_unique" ON "pages_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_locales_parent_id_idx" ON "pages_blocks_gallery_images_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_gallery_locales_locale_parent_id_unique" ON "pages_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_locales_parent_id_idx" ON "pages_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_final_booking_order_idx" ON "pages_blocks_final_booking" USING btree ("_order");
  CREATE INDEX "pages_blocks_final_booking_parent_id_idx" ON "pages_blocks_final_booking" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_final_booking_path_idx" ON "pages_blocks_final_booking" USING btree ("_path");
  CREATE INDEX "pages_blocks_final_booking_image_image_upload_idx" ON "pages_blocks_final_booking" USING btree ("image_upload_id");
  CREATE UNIQUE INDEX "pages_blocks_final_booking_locales_locale_parent_id_unique" ON "pages_blocks_final_booking_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_final_booking_locales_parent_id_idx" ON "pages_blocks_final_booking_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_arrival_transport_order_idx" ON "pages_blocks_arrival_transport" USING btree ("_order");
  CREATE INDEX "pages_blocks_arrival_transport_parent_id_idx" ON "pages_blocks_arrival_transport" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_arrival_transport_locale_idx" ON "pages_blocks_arrival_transport" USING btree ("_locale");
  CREATE INDEX "pages_blocks_arrival_order_idx" ON "pages_blocks_arrival" USING btree ("_order");
  CREATE INDEX "pages_blocks_arrival_parent_id_idx" ON "pages_blocks_arrival" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_arrival_path_idx" ON "pages_blocks_arrival" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_arrival_locales_locale_parent_id_unique" ON "pages_blocks_arrival_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_arrival_locales_parent_id_idx" ON "pages_blocks_arrival_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_contact_locales_locale_parent_id_unique" ON "pages_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_locales_parent_id_idx" ON "pages_blocks_contact_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_room_list_order_idx" ON "pages_blocks_room_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_room_list_parent_id_idx" ON "pages_blocks_room_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_room_list_path_idx" ON "pages_blocks_room_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_offers_items_order_idx" ON "pages_blocks_offers_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_offers_items_parent_id_idx" ON "pages_blocks_offers_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_offers_items_image_image_upload_idx" ON "pages_blocks_offers_items" USING btree ("image_upload_id");
  CREATE UNIQUE INDEX "pages_blocks_offers_items_locales_locale_parent_id_unique" ON "pages_blocks_offers_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_offers_items_locales_parent_id_idx" ON "pages_blocks_offers_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_offers_order_idx" ON "pages_blocks_offers" USING btree ("_order");
  CREATE INDEX "pages_blocks_offers_parent_id_idx" ON "pages_blocks_offers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_offers_path_idx" ON "pages_blocks_offers" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_offers_locales_locale_parent_id_unique" ON "pages_blocks_offers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_offers_locales_parent_id_idx" ON "pages_blocks_offers_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_items_locales_locale_parent_id_unique" ON "pages_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_items_locales_parent_id_idx" ON "pages_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_locales_parent_id_idx" ON "pages_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_locales_parent_id_idx" ON "pages_blocks_cta_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_og_image_og_image_upload_idx" ON "pages" USING btree ("og_image_upload_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_image_upload_idx" ON "_pages_v_blocks_hero" USING btree ("image_upload_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_locales_parent_id_idx" ON "_pages_v_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_body_order_idx" ON "_pages_v_blocks_split_body" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_body_parent_id_idx" ON "_pages_v_blocks_split_body" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_body_locale_idx" ON "_pages_v_blocks_split_body" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_split_facts_order_idx" ON "_pages_v_blocks_split_facts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_facts_parent_id_idx" ON "_pages_v_blocks_split_facts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_facts_locale_idx" ON "_pages_v_blocks_split_facts" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_split_bullets_order_idx" ON "_pages_v_blocks_split_bullets" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_bullets_parent_id_idx" ON "_pages_v_blocks_split_bullets" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_bullets_locale_idx" ON "_pages_v_blocks_split_bullets" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_split_order_idx" ON "_pages_v_blocks_split" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_parent_id_idx" ON "_pages_v_blocks_split" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_path_idx" ON "_pages_v_blocks_split" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split_image1_image1_upload_idx" ON "_pages_v_blocks_split" USING btree ("image1_upload_id");
  CREATE INDEX "_pages_v_blocks_split_image2_image2_upload_idx" ON "_pages_v_blocks_split" USING btree ("image2_upload_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_split_locales_locale_parent_id_unique" ON "_pages_v_blocks_split_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_split_locales_parent_id_idx" ON "_pages_v_blocks_split_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_facts_items_order_idx" ON "_pages_v_blocks_facts_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_facts_items_parent_id_idx" ON "_pages_v_blocks_facts_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_facts_items_locale_idx" ON "_pages_v_blocks_facts_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_facts_order_idx" ON "_pages_v_blocks_facts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_facts_parent_id_idx" ON "_pages_v_blocks_facts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_facts_path_idx" ON "_pages_v_blocks_facts" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_facts_locales_locale_parent_id_unique" ON "_pages_v_blocks_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_facts_locales_parent_id_idx" ON "_pages_v_blocks_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_order_idx" ON "_pages_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_parent_id_idx" ON "_pages_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_path_idx" ON "_pages_v_blocks_statement" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_statement_locales_locale_parent_id_unique" ON "_pages_v_blocks_statement_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_locales_parent_id_idx" ON "_pages_v_blocks_statement_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_order_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_images_parent_id_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_image_image_upload_idx" ON "_pages_v_blocks_gallery_images" USING btree ("image_upload_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_gallery_images_locales_locale_parent_id_uniq" ON "_pages_v_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_locales_parent_id_idx" ON "_pages_v_blocks_gallery_images_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_gallery_locales_locale_parent_id_unique" ON "_pages_v_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_locales_parent_id_idx" ON "_pages_v_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_final_booking_order_idx" ON "_pages_v_blocks_final_booking" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_final_booking_parent_id_idx" ON "_pages_v_blocks_final_booking" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_final_booking_path_idx" ON "_pages_v_blocks_final_booking" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_final_booking_image_image_upload_idx" ON "_pages_v_blocks_final_booking" USING btree ("image_upload_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_final_booking_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_final_booking_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_final_booking_locales_parent_id_idx" ON "_pages_v_blocks_final_booking_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_arrival_transport_order_idx" ON "_pages_v_blocks_arrival_transport" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_arrival_transport_parent_id_idx" ON "_pages_v_blocks_arrival_transport" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_arrival_transport_locale_idx" ON "_pages_v_blocks_arrival_transport" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_arrival_order_idx" ON "_pages_v_blocks_arrival" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_arrival_parent_id_idx" ON "_pages_v_blocks_arrival" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_arrival_path_idx" ON "_pages_v_blocks_arrival" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_arrival_locales_locale_parent_id_unique" ON "_pages_v_blocks_arrival_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_arrival_locales_parent_id_idx" ON "_pages_v_blocks_arrival_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_order_idx" ON "_pages_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_parent_id_idx" ON "_pages_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_path_idx" ON "_pages_v_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_locales_locale_parent_id_unique" ON "_pages_v_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_locales_parent_id_idx" ON "_pages_v_blocks_contact_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_room_list_order_idx" ON "_pages_v_blocks_room_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_room_list_parent_id_idx" ON "_pages_v_blocks_room_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_room_list_path_idx" ON "_pages_v_blocks_room_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_offers_items_order_idx" ON "_pages_v_blocks_offers_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_offers_items_parent_id_idx" ON "_pages_v_blocks_offers_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_offers_items_image_image_upload_idx" ON "_pages_v_blocks_offers_items" USING btree ("image_upload_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_offers_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_offers_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_offers_items_locales_parent_id_idx" ON "_pages_v_blocks_offers_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_offers_order_idx" ON "_pages_v_blocks_offers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_offers_parent_id_idx" ON "_pages_v_blocks_offers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_offers_path_idx" ON "_pages_v_blocks_offers" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_offers_locales_locale_parent_id_unique" ON "_pages_v_blocks_offers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_offers_locales_parent_id_idx" ON "_pages_v_blocks_offers_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_locales_parent_id_idx" ON "_pages_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_locales_parent_id_idx" ON "_pages_v_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_locales_parent_id_idx" ON "_pages_v_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_og_image_version_og_image_upload_idx" ON "_pages_v" USING btree ("version_og_image_upload_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_locales_parent_id_idx" ON "_pages_v_locales" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_hero_order_idx" ON "custom_pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_hero_parent_id_idx" ON "custom_pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_hero_path_idx" ON "custom_pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "custom_pages_blocks_hero_image_image_upload_idx" ON "custom_pages_blocks_hero" USING btree ("image_upload_id");
  CREATE UNIQUE INDEX "custom_pages_blocks_hero_locales_locale_parent_id_unique" ON "custom_pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "custom_pages_blocks_hero_locales_parent_id_idx" ON "custom_pages_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_split_body_order_idx" ON "custom_pages_blocks_split_body" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_split_body_parent_id_idx" ON "custom_pages_blocks_split_body" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_split_body_locale_idx" ON "custom_pages_blocks_split_body" USING btree ("_locale");
  CREATE INDEX "custom_pages_blocks_split_facts_order_idx" ON "custom_pages_blocks_split_facts" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_split_facts_parent_id_idx" ON "custom_pages_blocks_split_facts" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_split_facts_locale_idx" ON "custom_pages_blocks_split_facts" USING btree ("_locale");
  CREATE INDEX "custom_pages_blocks_split_bullets_order_idx" ON "custom_pages_blocks_split_bullets" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_split_bullets_parent_id_idx" ON "custom_pages_blocks_split_bullets" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_split_bullets_locale_idx" ON "custom_pages_blocks_split_bullets" USING btree ("_locale");
  CREATE INDEX "custom_pages_blocks_split_order_idx" ON "custom_pages_blocks_split" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_split_parent_id_idx" ON "custom_pages_blocks_split" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_split_path_idx" ON "custom_pages_blocks_split" USING btree ("_path");
  CREATE INDEX "custom_pages_blocks_split_image1_image1_upload_idx" ON "custom_pages_blocks_split" USING btree ("image1_upload_id");
  CREATE INDEX "custom_pages_blocks_split_image2_image2_upload_idx" ON "custom_pages_blocks_split" USING btree ("image2_upload_id");
  CREATE UNIQUE INDEX "custom_pages_blocks_split_locales_locale_parent_id_unique" ON "custom_pages_blocks_split_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "custom_pages_blocks_split_locales_parent_id_idx" ON "custom_pages_blocks_split_locales" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_facts_items_order_idx" ON "custom_pages_blocks_facts_items" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_facts_items_parent_id_idx" ON "custom_pages_blocks_facts_items" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_facts_items_locale_idx" ON "custom_pages_blocks_facts_items" USING btree ("_locale");
  CREATE INDEX "custom_pages_blocks_facts_order_idx" ON "custom_pages_blocks_facts" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_facts_parent_id_idx" ON "custom_pages_blocks_facts" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_facts_path_idx" ON "custom_pages_blocks_facts" USING btree ("_path");
  CREATE UNIQUE INDEX "custom_pages_blocks_facts_locales_locale_parent_id_unique" ON "custom_pages_blocks_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "custom_pages_blocks_facts_locales_parent_id_idx" ON "custom_pages_blocks_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_statement_order_idx" ON "custom_pages_blocks_statement" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_statement_parent_id_idx" ON "custom_pages_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_statement_path_idx" ON "custom_pages_blocks_statement" USING btree ("_path");
  CREATE UNIQUE INDEX "custom_pages_blocks_statement_locales_locale_parent_id_uniqu" ON "custom_pages_blocks_statement_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "custom_pages_blocks_statement_locales_parent_id_idx" ON "custom_pages_blocks_statement_locales" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_gallery_images_order_idx" ON "custom_pages_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_gallery_images_parent_id_idx" ON "custom_pages_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_gallery_images_image_image_upload_idx" ON "custom_pages_blocks_gallery_images" USING btree ("image_upload_id");
  CREATE UNIQUE INDEX "custom_pages_blocks_gallery_images_locales_locale_parent_id_" ON "custom_pages_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "custom_pages_blocks_gallery_images_locales_parent_id_idx" ON "custom_pages_blocks_gallery_images_locales" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_gallery_order_idx" ON "custom_pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_gallery_parent_id_idx" ON "custom_pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_gallery_path_idx" ON "custom_pages_blocks_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "custom_pages_blocks_gallery_locales_locale_parent_id_unique" ON "custom_pages_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "custom_pages_blocks_gallery_locales_parent_id_idx" ON "custom_pages_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_final_booking_order_idx" ON "custom_pages_blocks_final_booking" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_final_booking_parent_id_idx" ON "custom_pages_blocks_final_booking" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_final_booking_path_idx" ON "custom_pages_blocks_final_booking" USING btree ("_path");
  CREATE INDEX "custom_pages_blocks_final_booking_image_image_upload_idx" ON "custom_pages_blocks_final_booking" USING btree ("image_upload_id");
  CREATE UNIQUE INDEX "custom_pages_blocks_final_booking_locales_locale_parent_id_u" ON "custom_pages_blocks_final_booking_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "custom_pages_blocks_final_booking_locales_parent_id_idx" ON "custom_pages_blocks_final_booking_locales" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_arrival_transport_order_idx" ON "custom_pages_blocks_arrival_transport" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_arrival_transport_parent_id_idx" ON "custom_pages_blocks_arrival_transport" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_arrival_transport_locale_idx" ON "custom_pages_blocks_arrival_transport" USING btree ("_locale");
  CREATE INDEX "custom_pages_blocks_arrival_order_idx" ON "custom_pages_blocks_arrival" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_arrival_parent_id_idx" ON "custom_pages_blocks_arrival" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_arrival_path_idx" ON "custom_pages_blocks_arrival" USING btree ("_path");
  CREATE UNIQUE INDEX "custom_pages_blocks_arrival_locales_locale_parent_id_unique" ON "custom_pages_blocks_arrival_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "custom_pages_blocks_arrival_locales_parent_id_idx" ON "custom_pages_blocks_arrival_locales" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_contact_order_idx" ON "custom_pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_contact_parent_id_idx" ON "custom_pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_contact_path_idx" ON "custom_pages_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "custom_pages_blocks_contact_locales_locale_parent_id_unique" ON "custom_pages_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "custom_pages_blocks_contact_locales_parent_id_idx" ON "custom_pages_blocks_contact_locales" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_room_list_order_idx" ON "custom_pages_blocks_room_list" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_room_list_parent_id_idx" ON "custom_pages_blocks_room_list" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_room_list_path_idx" ON "custom_pages_blocks_room_list" USING btree ("_path");
  CREATE INDEX "custom_pages_blocks_offers_items_order_idx" ON "custom_pages_blocks_offers_items" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_offers_items_parent_id_idx" ON "custom_pages_blocks_offers_items" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_offers_items_image_image_upload_idx" ON "custom_pages_blocks_offers_items" USING btree ("image_upload_id");
  CREATE UNIQUE INDEX "custom_pages_blocks_offers_items_locales_locale_parent_id_un" ON "custom_pages_blocks_offers_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "custom_pages_blocks_offers_items_locales_parent_id_idx" ON "custom_pages_blocks_offers_items_locales" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_offers_order_idx" ON "custom_pages_blocks_offers" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_offers_parent_id_idx" ON "custom_pages_blocks_offers" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_offers_path_idx" ON "custom_pages_blocks_offers" USING btree ("_path");
  CREATE UNIQUE INDEX "custom_pages_blocks_offers_locales_locale_parent_id_unique" ON "custom_pages_blocks_offers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "custom_pages_blocks_offers_locales_parent_id_idx" ON "custom_pages_blocks_offers_locales" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_faq_items_order_idx" ON "custom_pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_faq_items_parent_id_idx" ON "custom_pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "custom_pages_blocks_faq_items_locales_locale_parent_id_uniqu" ON "custom_pages_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "custom_pages_blocks_faq_items_locales_parent_id_idx" ON "custom_pages_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_faq_order_idx" ON "custom_pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_faq_parent_id_idx" ON "custom_pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_faq_path_idx" ON "custom_pages_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "custom_pages_blocks_faq_locales_locale_parent_id_unique" ON "custom_pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "custom_pages_blocks_faq_locales_parent_id_idx" ON "custom_pages_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_cta_order_idx" ON "custom_pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "custom_pages_blocks_cta_parent_id_idx" ON "custom_pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_blocks_cta_path_idx" ON "custom_pages_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "custom_pages_blocks_cta_locales_locale_parent_id_unique" ON "custom_pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "custom_pages_blocks_cta_locales_parent_id_idx" ON "custom_pages_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "custom_pages_og_image_og_image_upload_idx" ON "custom_pages" USING btree ("og_image_upload_id");
  CREATE INDEX "custom_pages_updated_at_idx" ON "custom_pages" USING btree ("updated_at");
  CREATE INDEX "custom_pages_created_at_idx" ON "custom_pages" USING btree ("created_at");
  CREATE INDEX "custom_pages__status_idx" ON "custom_pages" USING btree ("_status");
  CREATE INDEX "custom_pages_slug_idx" ON "custom_pages_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "custom_pages_locales_locale_parent_id_unique" ON "custom_pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "custom_pages_locales_parent_id_idx" ON "custom_pages_locales" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_hero_order_idx" ON "_custom_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_hero_parent_id_idx" ON "_custom_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_hero_path_idx" ON "_custom_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_custom_pages_v_blocks_hero_image_image_upload_idx" ON "_custom_pages_v_blocks_hero" USING btree ("image_upload_id");
  CREATE UNIQUE INDEX "_custom_pages_v_blocks_hero_locales_locale_parent_id_unique" ON "_custom_pages_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_hero_locales_parent_id_idx" ON "_custom_pages_v_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_split_body_order_idx" ON "_custom_pages_v_blocks_split_body" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_split_body_parent_id_idx" ON "_custom_pages_v_blocks_split_body" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_split_body_locale_idx" ON "_custom_pages_v_blocks_split_body" USING btree ("_locale");
  CREATE INDEX "_custom_pages_v_blocks_split_facts_order_idx" ON "_custom_pages_v_blocks_split_facts" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_split_facts_parent_id_idx" ON "_custom_pages_v_blocks_split_facts" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_split_facts_locale_idx" ON "_custom_pages_v_blocks_split_facts" USING btree ("_locale");
  CREATE INDEX "_custom_pages_v_blocks_split_bullets_order_idx" ON "_custom_pages_v_blocks_split_bullets" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_split_bullets_parent_id_idx" ON "_custom_pages_v_blocks_split_bullets" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_split_bullets_locale_idx" ON "_custom_pages_v_blocks_split_bullets" USING btree ("_locale");
  CREATE INDEX "_custom_pages_v_blocks_split_order_idx" ON "_custom_pages_v_blocks_split" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_split_parent_id_idx" ON "_custom_pages_v_blocks_split" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_split_path_idx" ON "_custom_pages_v_blocks_split" USING btree ("_path");
  CREATE INDEX "_custom_pages_v_blocks_split_image1_image1_upload_idx" ON "_custom_pages_v_blocks_split" USING btree ("image1_upload_id");
  CREATE INDEX "_custom_pages_v_blocks_split_image2_image2_upload_idx" ON "_custom_pages_v_blocks_split" USING btree ("image2_upload_id");
  CREATE UNIQUE INDEX "_custom_pages_v_blocks_split_locales_locale_parent_id_unique" ON "_custom_pages_v_blocks_split_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_split_locales_parent_id_idx" ON "_custom_pages_v_blocks_split_locales" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_facts_items_order_idx" ON "_custom_pages_v_blocks_facts_items" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_facts_items_parent_id_idx" ON "_custom_pages_v_blocks_facts_items" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_facts_items_locale_idx" ON "_custom_pages_v_blocks_facts_items" USING btree ("_locale");
  CREATE INDEX "_custom_pages_v_blocks_facts_order_idx" ON "_custom_pages_v_blocks_facts" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_facts_parent_id_idx" ON "_custom_pages_v_blocks_facts" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_facts_path_idx" ON "_custom_pages_v_blocks_facts" USING btree ("_path");
  CREATE UNIQUE INDEX "_custom_pages_v_blocks_facts_locales_locale_parent_id_unique" ON "_custom_pages_v_blocks_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_facts_locales_parent_id_idx" ON "_custom_pages_v_blocks_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_statement_order_idx" ON "_custom_pages_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_statement_parent_id_idx" ON "_custom_pages_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_statement_path_idx" ON "_custom_pages_v_blocks_statement" USING btree ("_path");
  CREATE UNIQUE INDEX "_custom_pages_v_blocks_statement_locales_locale_parent_id_un" ON "_custom_pages_v_blocks_statement_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_statement_locales_parent_id_idx" ON "_custom_pages_v_blocks_statement_locales" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_gallery_images_order_idx" ON "_custom_pages_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_gallery_images_parent_id_idx" ON "_custom_pages_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_gallery_images_image_image_upload_idx" ON "_custom_pages_v_blocks_gallery_images" USING btree ("image_upload_id");
  CREATE UNIQUE INDEX "_custom_pages_v_blocks_gallery_images_locales_locale_parent_" ON "_custom_pages_v_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_gallery_images_locales_parent_id_idx" ON "_custom_pages_v_blocks_gallery_images_locales" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_gallery_order_idx" ON "_custom_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_gallery_parent_id_idx" ON "_custom_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_gallery_path_idx" ON "_custom_pages_v_blocks_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "_custom_pages_v_blocks_gallery_locales_locale_parent_id_uniq" ON "_custom_pages_v_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_gallery_locales_parent_id_idx" ON "_custom_pages_v_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_final_booking_order_idx" ON "_custom_pages_v_blocks_final_booking" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_final_booking_parent_id_idx" ON "_custom_pages_v_blocks_final_booking" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_final_booking_path_idx" ON "_custom_pages_v_blocks_final_booking" USING btree ("_path");
  CREATE INDEX "_custom_pages_v_blocks_final_booking_image_image_upload_idx" ON "_custom_pages_v_blocks_final_booking" USING btree ("image_upload_id");
  CREATE UNIQUE INDEX "_custom_pages_v_blocks_final_booking_locales_locale_parent_i" ON "_custom_pages_v_blocks_final_booking_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_final_booking_locales_parent_id_idx" ON "_custom_pages_v_blocks_final_booking_locales" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_arrival_transport_order_idx" ON "_custom_pages_v_blocks_arrival_transport" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_arrival_transport_parent_id_idx" ON "_custom_pages_v_blocks_arrival_transport" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_arrival_transport_locale_idx" ON "_custom_pages_v_blocks_arrival_transport" USING btree ("_locale");
  CREATE INDEX "_custom_pages_v_blocks_arrival_order_idx" ON "_custom_pages_v_blocks_arrival" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_arrival_parent_id_idx" ON "_custom_pages_v_blocks_arrival" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_arrival_path_idx" ON "_custom_pages_v_blocks_arrival" USING btree ("_path");
  CREATE UNIQUE INDEX "_custom_pages_v_blocks_arrival_locales_locale_parent_id_uniq" ON "_custom_pages_v_blocks_arrival_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_arrival_locales_parent_id_idx" ON "_custom_pages_v_blocks_arrival_locales" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_contact_order_idx" ON "_custom_pages_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_contact_parent_id_idx" ON "_custom_pages_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_contact_path_idx" ON "_custom_pages_v_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "_custom_pages_v_blocks_contact_locales_locale_parent_id_uniq" ON "_custom_pages_v_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_contact_locales_parent_id_idx" ON "_custom_pages_v_blocks_contact_locales" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_room_list_order_idx" ON "_custom_pages_v_blocks_room_list" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_room_list_parent_id_idx" ON "_custom_pages_v_blocks_room_list" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_room_list_path_idx" ON "_custom_pages_v_blocks_room_list" USING btree ("_path");
  CREATE INDEX "_custom_pages_v_blocks_offers_items_order_idx" ON "_custom_pages_v_blocks_offers_items" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_offers_items_parent_id_idx" ON "_custom_pages_v_blocks_offers_items" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_offers_items_image_image_upload_idx" ON "_custom_pages_v_blocks_offers_items" USING btree ("image_upload_id");
  CREATE UNIQUE INDEX "_custom_pages_v_blocks_offers_items_locales_locale_parent_id" ON "_custom_pages_v_blocks_offers_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_offers_items_locales_parent_id_idx" ON "_custom_pages_v_blocks_offers_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_offers_order_idx" ON "_custom_pages_v_blocks_offers" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_offers_parent_id_idx" ON "_custom_pages_v_blocks_offers" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_offers_path_idx" ON "_custom_pages_v_blocks_offers" USING btree ("_path");
  CREATE UNIQUE INDEX "_custom_pages_v_blocks_offers_locales_locale_parent_id_uniqu" ON "_custom_pages_v_blocks_offers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_offers_locales_parent_id_idx" ON "_custom_pages_v_blocks_offers_locales" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_faq_items_order_idx" ON "_custom_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_faq_items_parent_id_idx" ON "_custom_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_custom_pages_v_blocks_faq_items_locales_locale_parent_id_un" ON "_custom_pages_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_faq_items_locales_parent_id_idx" ON "_custom_pages_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_faq_order_idx" ON "_custom_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_faq_parent_id_idx" ON "_custom_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_faq_path_idx" ON "_custom_pages_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_custom_pages_v_blocks_faq_locales_locale_parent_id_unique" ON "_custom_pages_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_faq_locales_parent_id_idx" ON "_custom_pages_v_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_cta_order_idx" ON "_custom_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_custom_pages_v_blocks_cta_parent_id_idx" ON "_custom_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_cta_path_idx" ON "_custom_pages_v_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "_custom_pages_v_blocks_cta_locales_locale_parent_id_unique" ON "_custom_pages_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_custom_pages_v_blocks_cta_locales_parent_id_idx" ON "_custom_pages_v_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "_custom_pages_v_parent_idx" ON "_custom_pages_v" USING btree ("parent_id");
  CREATE INDEX "_custom_pages_v_version_og_image_version_og_image_upload_idx" ON "_custom_pages_v" USING btree ("version_og_image_upload_id");
  CREATE INDEX "_custom_pages_v_version_version_updated_at_idx" ON "_custom_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_custom_pages_v_version_version_created_at_idx" ON "_custom_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_custom_pages_v_version_version__status_idx" ON "_custom_pages_v" USING btree ("version__status");
  CREATE INDEX "_custom_pages_v_created_at_idx" ON "_custom_pages_v" USING btree ("created_at");
  CREATE INDEX "_custom_pages_v_updated_at_idx" ON "_custom_pages_v" USING btree ("updated_at");
  CREATE INDEX "_custom_pages_v_snapshot_idx" ON "_custom_pages_v" USING btree ("snapshot");
  CREATE INDEX "_custom_pages_v_published_locale_idx" ON "_custom_pages_v" USING btree ("published_locale");
  CREATE INDEX "_custom_pages_v_latest_idx" ON "_custom_pages_v" USING btree ("latest");
  CREATE INDEX "_custom_pages_v_autosave_idx" ON "_custom_pages_v" USING btree ("autosave");
  CREATE INDEX "_custom_pages_v_version_version_slug_idx" ON "_custom_pages_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_custom_pages_v_locales_locale_parent_id_unique" ON "_custom_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_custom_pages_v_locales_parent_id_idx" ON "_custom_pages_v_locales" USING btree ("_parent_id");
  CREATE INDEX "rooms_description_order_idx" ON "rooms_description" USING btree ("_order");
  CREATE INDEX "rooms_description_parent_id_idx" ON "rooms_description" USING btree ("_parent_id");
  CREATE INDEX "rooms_description_locale_idx" ON "rooms_description" USING btree ("_locale");
  CREATE INDEX "rooms_highlights_order_idx" ON "rooms_highlights" USING btree ("_order");
  CREATE INDEX "rooms_highlights_parent_id_idx" ON "rooms_highlights" USING btree ("_parent_id");
  CREATE INDEX "rooms_highlights_locale_idx" ON "rooms_highlights" USING btree ("_locale");
  CREATE INDEX "rooms_amenities_order_idx" ON "rooms_amenities" USING btree ("_order");
  CREATE INDEX "rooms_amenities_parent_id_idx" ON "rooms_amenities" USING btree ("_parent_id");
  CREATE INDEX "rooms_amenities_locale_idx" ON "rooms_amenities" USING btree ("_locale");
  CREATE INDEX "rooms_gallery_order_idx" ON "rooms_gallery" USING btree ("_order");
  CREATE INDEX "rooms_gallery_parent_id_idx" ON "rooms_gallery" USING btree ("_parent_id");
  CREATE INDEX "rooms_gallery_image_idx" ON "rooms_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "rooms_slug_idx" ON "rooms" USING btree ("slug");
  CREATE INDEX "rooms_order_idx" ON "rooms" USING btree ("order");
  CREATE INDEX "rooms_updated_at_idx" ON "rooms" USING btree ("updated_at");
  CREATE INDEX "rooms_created_at_idx" ON "rooms" USING btree ("created_at");
  CREATE INDEX "rooms__status_idx" ON "rooms" USING btree ("_status");
  CREATE UNIQUE INDEX "rooms_locales_locale_parent_id_unique" ON "rooms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "rooms_locales_parent_id_idx" ON "rooms_locales" USING btree ("_parent_id");
  CREATE INDEX "_rooms_v_version_description_order_idx" ON "_rooms_v_version_description" USING btree ("_order");
  CREATE INDEX "_rooms_v_version_description_parent_id_idx" ON "_rooms_v_version_description" USING btree ("_parent_id");
  CREATE INDEX "_rooms_v_version_description_locale_idx" ON "_rooms_v_version_description" USING btree ("_locale");
  CREATE INDEX "_rooms_v_version_highlights_order_idx" ON "_rooms_v_version_highlights" USING btree ("_order");
  CREATE INDEX "_rooms_v_version_highlights_parent_id_idx" ON "_rooms_v_version_highlights" USING btree ("_parent_id");
  CREATE INDEX "_rooms_v_version_highlights_locale_idx" ON "_rooms_v_version_highlights" USING btree ("_locale");
  CREATE INDEX "_rooms_v_version_amenities_order_idx" ON "_rooms_v_version_amenities" USING btree ("_order");
  CREATE INDEX "_rooms_v_version_amenities_parent_id_idx" ON "_rooms_v_version_amenities" USING btree ("_parent_id");
  CREATE INDEX "_rooms_v_version_amenities_locale_idx" ON "_rooms_v_version_amenities" USING btree ("_locale");
  CREATE INDEX "_rooms_v_version_gallery_order_idx" ON "_rooms_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_rooms_v_version_gallery_parent_id_idx" ON "_rooms_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_rooms_v_version_gallery_image_idx" ON "_rooms_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_rooms_v_parent_idx" ON "_rooms_v" USING btree ("parent_id");
  CREATE INDEX "_rooms_v_version_version_slug_idx" ON "_rooms_v" USING btree ("version_slug");
  CREATE INDEX "_rooms_v_version_version_order_idx" ON "_rooms_v" USING btree ("version_order");
  CREATE INDEX "_rooms_v_version_version_updated_at_idx" ON "_rooms_v" USING btree ("version_updated_at");
  CREATE INDEX "_rooms_v_version_version_created_at_idx" ON "_rooms_v" USING btree ("version_created_at");
  CREATE INDEX "_rooms_v_version_version__status_idx" ON "_rooms_v" USING btree ("version__status");
  CREATE INDEX "_rooms_v_created_at_idx" ON "_rooms_v" USING btree ("created_at");
  CREATE INDEX "_rooms_v_updated_at_idx" ON "_rooms_v" USING btree ("updated_at");
  CREATE INDEX "_rooms_v_snapshot_idx" ON "_rooms_v" USING btree ("snapshot");
  CREATE INDEX "_rooms_v_published_locale_idx" ON "_rooms_v" USING btree ("published_locale");
  CREATE INDEX "_rooms_v_latest_idx" ON "_rooms_v" USING btree ("latest");
  CREATE INDEX "_rooms_v_autosave_idx" ON "_rooms_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_rooms_v_locales_locale_parent_id_unique" ON "_rooms_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_rooms_v_locales_parent_id_idx" ON "_rooms_v_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_custom_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("custom_pages_id");
  CREATE INDEX "payload_locked_documents_rels_rooms_id_idx" ON "payload_locked_documents_rels" USING btree ("rooms_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "navigation_items_order_idx" ON "navigation_items" USING btree ("_order");
  CREATE INDEX "navigation_items_parent_id_idx" ON "navigation_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_items_locales_locale_parent_id_unique" ON "navigation_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_items_locales_parent_id_idx" ON "navigation_items_locales" USING btree ("_parent_id");
  CREATE INDEX "navigation__status_idx" ON "navigation" USING btree ("_status");
  CREATE UNIQUE INDEX "navigation_locales_locale_parent_id_unique" ON "navigation_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_locales_parent_id_idx" ON "navigation_locales" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_version_items_order_idx" ON "_navigation_v_version_items" USING btree ("_order");
  CREATE INDEX "_navigation_v_version_items_parent_id_idx" ON "_navigation_v_version_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_navigation_v_version_items_locales_locale_parent_id_unique" ON "_navigation_v_version_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_navigation_v_version_items_locales_parent_id_idx" ON "_navigation_v_version_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_version_version__status_idx" ON "_navigation_v" USING btree ("version__status");
  CREATE INDEX "_navigation_v_created_at_idx" ON "_navigation_v" USING btree ("created_at");
  CREATE INDEX "_navigation_v_updated_at_idx" ON "_navigation_v" USING btree ("updated_at");
  CREATE INDEX "_navigation_v_snapshot_idx" ON "_navigation_v" USING btree ("snapshot");
  CREATE INDEX "_navigation_v_published_locale_idx" ON "_navigation_v" USING btree ("published_locale");
  CREATE INDEX "_navigation_v_latest_idx" ON "_navigation_v" USING btree ("latest");
  CREATE INDEX "_navigation_v_autosave_idx" ON "_navigation_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_navigation_v_locales_locale_parent_id_unique" ON "_navigation_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_navigation_v_locales_parent_id_idx" ON "_navigation_v_locales" USING btree ("_parent_id");
  CREATE INDEX "footer_social_order_idx" ON "footer_social" USING btree ("_order");
  CREATE INDEX "footer_social_parent_id_idx" ON "footer_social" USING btree ("_parent_id");
  CREATE INDEX "footer__status_idx" ON "footer" USING btree ("_status");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_locales_parent_id_idx" ON "footer_locales" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_social_order_idx" ON "_footer_v_version_social" USING btree ("_order");
  CREATE INDEX "_footer_v_version_social_parent_id_idx" ON "_footer_v_version_social" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_version__status_idx" ON "_footer_v" USING btree ("version__status");
  CREATE INDEX "_footer_v_created_at_idx" ON "_footer_v" USING btree ("created_at");
  CREATE INDEX "_footer_v_updated_at_idx" ON "_footer_v" USING btree ("updated_at");
  CREATE INDEX "_footer_v_snapshot_idx" ON "_footer_v" USING btree ("snapshot");
  CREATE INDEX "_footer_v_published_locale_idx" ON "_footer_v" USING btree ("published_locale");
  CREATE INDEX "_footer_v_latest_idx" ON "_footer_v" USING btree ("latest");
  CREATE INDEX "_footer_v_autosave_idx" ON "_footer_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_footer_v_locales_locale_parent_id_unique" ON "_footer_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_footer_v_locales_parent_id_idx" ON "_footer_v_locales" USING btree ("_parent_id");
  CREATE INDEX "homepage_spa_facts_order_idx" ON "homepage_spa_facts" USING btree ("_order");
  CREATE INDEX "homepage_spa_facts_parent_id_idx" ON "homepage_spa_facts" USING btree ("_parent_id");
  CREATE INDEX "homepage_spa_facts_locale_idx" ON "homepage_spa_facts" USING btree ("_locale");
  CREATE INDEX "homepage_location_facts_order_idx" ON "homepage_location_facts" USING btree ("_order");
  CREATE INDEX "homepage_location_facts_parent_id_idx" ON "homepage_location_facts" USING btree ("_parent_id");
  CREATE INDEX "homepage_location_facts_locale_idx" ON "homepage_location_facts" USING btree ("_locale");
  CREATE INDEX "homepage_og_image_og_image_upload_idx" ON "homepage" USING btree ("og_image_upload_id");
  CREATE INDEX "homepage_hero_image_hero_image_upload_idx" ON "homepage" USING btree ("hero_image_upload_id");
  CREATE INDEX "homepage_hotel_image_left_hotel_image_left_upload_idx" ON "homepage" USING btree ("hotel_image_left_upload_id");
  CREATE INDEX "homepage_hotel_image_center_hotel_image_center_upload_idx" ON "homepage" USING btree ("hotel_image_center_upload_id");
  CREATE INDEX "homepage_hotel_image_right_hotel_image_right_upload_idx" ON "homepage" USING btree ("hotel_image_right_upload_id");
  CREATE INDEX "homepage_spa_image_main_spa_image_main_upload_idx" ON "homepage" USING btree ("spa_image_main_upload_id");
  CREATE INDEX "homepage_spa_image_secondary_spa_image_secondary_upload_idx" ON "homepage" USING btree ("spa_image_secondary_upload_id");
  CREATE INDEX "homepage_restaurant_image_main_restaurant_image_main_upl_idx" ON "homepage" USING btree ("restaurant_image_main_upload_id");
  CREATE INDEX "homepage_restaurant_image_coffee_restaurant_image_coffee_idx" ON "homepage" USING btree ("restaurant_image_coffee_upload_id");
  CREATE INDEX "homepage_restaurant_image_buffet_restaurant_image_buffet_idx" ON "homepage" USING btree ("restaurant_image_buffet_upload_id");
  CREATE INDEX "homepage_location_image_location_image_upload_idx" ON "homepage" USING btree ("location_image_upload_id");
  CREATE INDEX "homepage_events_image_main_events_image_main_upload_idx" ON "homepage" USING btree ("events_image_main_upload_id");
  CREATE INDEX "homepage_events_image_secondary_events_image_secondary_u_idx" ON "homepage" USING btree ("events_image_secondary_upload_id");
  CREATE INDEX "homepage_final_image_final_image_upload_idx" ON "homepage" USING btree ("final_image_upload_id");
  CREATE INDEX "homepage__status_idx" ON "homepage" USING btree ("_status");
  CREATE UNIQUE INDEX "homepage_locales_locale_parent_id_unique" ON "homepage_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_locales_parent_id_idx" ON "homepage_locales" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_spa_facts_order_idx" ON "_homepage_v_version_spa_facts" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_spa_facts_parent_id_idx" ON "_homepage_v_version_spa_facts" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_spa_facts_locale_idx" ON "_homepage_v_version_spa_facts" USING btree ("_locale");
  CREATE INDEX "_homepage_v_version_location_facts_order_idx" ON "_homepage_v_version_location_facts" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_location_facts_parent_id_idx" ON "_homepage_v_version_location_facts" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_location_facts_locale_idx" ON "_homepage_v_version_location_facts" USING btree ("_locale");
  CREATE INDEX "_homepage_v_version_og_image_version_og_image_upload_idx" ON "_homepage_v" USING btree ("version_og_image_upload_id");
  CREATE INDEX "_homepage_v_version_hero_image_version_hero_image_upload_idx" ON "_homepage_v" USING btree ("version_hero_image_upload_id");
  CREATE INDEX "_homepage_v_version_hotel_image_left_version_hotel_image_idx" ON "_homepage_v" USING btree ("version_hotel_image_left_upload_id");
  CREATE INDEX "_homepage_v_version_hotel_image_center_version_hotel_ima_idx" ON "_homepage_v" USING btree ("version_hotel_image_center_upload_id");
  CREATE INDEX "_homepage_v_version_hotel_image_right_version_hotel_imag_idx" ON "_homepage_v" USING btree ("version_hotel_image_right_upload_id");
  CREATE INDEX "_homepage_v_version_spa_image_main_version_spa_image_mai_idx" ON "_homepage_v" USING btree ("version_spa_image_main_upload_id");
  CREATE INDEX "_homepage_v_version_spa_image_secondary_version_spa_imag_idx" ON "_homepage_v" USING btree ("version_spa_image_secondary_upload_id");
  CREATE INDEX "_homepage_v_version_restaurant_image_main_version_restau_idx" ON "_homepage_v" USING btree ("version_restaurant_image_main_upload_id");
  CREATE INDEX "_homepage_v_version_restaurant_image_coffee_version_rest_idx" ON "_homepage_v" USING btree ("version_restaurant_image_coffee_upload_id");
  CREATE INDEX "_homepage_v_version_restaurant_image_buffet_version_rest_idx" ON "_homepage_v" USING btree ("version_restaurant_image_buffet_upload_id");
  CREATE INDEX "_homepage_v_version_location_image_version_location_imag_idx" ON "_homepage_v" USING btree ("version_location_image_upload_id");
  CREATE INDEX "_homepage_v_version_events_image_main_version_events_ima_idx" ON "_homepage_v" USING btree ("version_events_image_main_upload_id");
  CREATE INDEX "_homepage_v_version_events_image_secondary_version_event_idx" ON "_homepage_v" USING btree ("version_events_image_secondary_upload_id");
  CREATE INDEX "_homepage_v_version_final_image_version_final_image_uplo_idx" ON "_homepage_v" USING btree ("version_final_image_upload_id");
  CREATE INDEX "_homepage_v_version_version__status_idx" ON "_homepage_v" USING btree ("version__status");
  CREATE INDEX "_homepage_v_created_at_idx" ON "_homepage_v" USING btree ("created_at");
  CREATE INDEX "_homepage_v_updated_at_idx" ON "_homepage_v" USING btree ("updated_at");
  CREATE INDEX "_homepage_v_snapshot_idx" ON "_homepage_v" USING btree ("snapshot");
  CREATE INDEX "_homepage_v_published_locale_idx" ON "_homepage_v" USING btree ("published_locale");
  CREATE INDEX "_homepage_v_latest_idx" ON "_homepage_v" USING btree ("latest");
  CREATE INDEX "_homepage_v_autosave_idx" ON "_homepage_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_homepage_v_locales_locale_parent_id_unique" ON "_homepage_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_locales_parent_id_idx" ON "_homepage_v_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_split_body" CASCADE;
  DROP TABLE "pages_blocks_split_facts" CASCADE;
  DROP TABLE "pages_blocks_split_bullets" CASCADE;
  DROP TABLE "pages_blocks_split" CASCADE;
  DROP TABLE "pages_blocks_split_locales" CASCADE;
  DROP TABLE "pages_blocks_facts_items" CASCADE;
  DROP TABLE "pages_blocks_facts" CASCADE;
  DROP TABLE "pages_blocks_facts_locales" CASCADE;
  DROP TABLE "pages_blocks_statement" CASCADE;
  DROP TABLE "pages_blocks_statement_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_gallery_locales" CASCADE;
  DROP TABLE "pages_blocks_final_booking" CASCADE;
  DROP TABLE "pages_blocks_final_booking_locales" CASCADE;
  DROP TABLE "pages_blocks_arrival_transport" CASCADE;
  DROP TABLE "pages_blocks_arrival" CASCADE;
  DROP TABLE "pages_blocks_arrival_locales" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "pages_blocks_contact_locales" CASCADE;
  DROP TABLE "pages_blocks_room_list" CASCADE;
  DROP TABLE "pages_blocks_offers_items" CASCADE;
  DROP TABLE "pages_blocks_offers_items_locales" CASCADE;
  DROP TABLE "pages_blocks_offers" CASCADE;
  DROP TABLE "pages_blocks_offers_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_split_body" CASCADE;
  DROP TABLE "_pages_v_blocks_split_facts" CASCADE;
  DROP TABLE "_pages_v_blocks_split_bullets" CASCADE;
  DROP TABLE "_pages_v_blocks_split" CASCADE;
  DROP TABLE "_pages_v_blocks_split_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_facts_items" CASCADE;
  DROP TABLE "_pages_v_blocks_facts" CASCADE;
  DROP TABLE "_pages_v_blocks_facts_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_statement" CASCADE;
  DROP TABLE "_pages_v_blocks_statement_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_final_booking" CASCADE;
  DROP TABLE "_pages_v_blocks_final_booking_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_arrival_transport" CASCADE;
  DROP TABLE "_pages_v_blocks_arrival" CASCADE;
  DROP TABLE "_pages_v_blocks_arrival_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_room_list" CASCADE;
  DROP TABLE "_pages_v_blocks_offers_items" CASCADE;
  DROP TABLE "_pages_v_blocks_offers_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_offers" CASCADE;
  DROP TABLE "_pages_v_blocks_offers_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "custom_pages_blocks_hero" CASCADE;
  DROP TABLE "custom_pages_blocks_hero_locales" CASCADE;
  DROP TABLE "custom_pages_blocks_split_body" CASCADE;
  DROP TABLE "custom_pages_blocks_split_facts" CASCADE;
  DROP TABLE "custom_pages_blocks_split_bullets" CASCADE;
  DROP TABLE "custom_pages_blocks_split" CASCADE;
  DROP TABLE "custom_pages_blocks_split_locales" CASCADE;
  DROP TABLE "custom_pages_blocks_facts_items" CASCADE;
  DROP TABLE "custom_pages_blocks_facts" CASCADE;
  DROP TABLE "custom_pages_blocks_facts_locales" CASCADE;
  DROP TABLE "custom_pages_blocks_statement" CASCADE;
  DROP TABLE "custom_pages_blocks_statement_locales" CASCADE;
  DROP TABLE "custom_pages_blocks_gallery_images" CASCADE;
  DROP TABLE "custom_pages_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "custom_pages_blocks_gallery" CASCADE;
  DROP TABLE "custom_pages_blocks_gallery_locales" CASCADE;
  DROP TABLE "custom_pages_blocks_final_booking" CASCADE;
  DROP TABLE "custom_pages_blocks_final_booking_locales" CASCADE;
  DROP TABLE "custom_pages_blocks_arrival_transport" CASCADE;
  DROP TABLE "custom_pages_blocks_arrival" CASCADE;
  DROP TABLE "custom_pages_blocks_arrival_locales" CASCADE;
  DROP TABLE "custom_pages_blocks_contact" CASCADE;
  DROP TABLE "custom_pages_blocks_contact_locales" CASCADE;
  DROP TABLE "custom_pages_blocks_room_list" CASCADE;
  DROP TABLE "custom_pages_blocks_offers_items" CASCADE;
  DROP TABLE "custom_pages_blocks_offers_items_locales" CASCADE;
  DROP TABLE "custom_pages_blocks_offers" CASCADE;
  DROP TABLE "custom_pages_blocks_offers_locales" CASCADE;
  DROP TABLE "custom_pages_blocks_faq_items" CASCADE;
  DROP TABLE "custom_pages_blocks_faq_items_locales" CASCADE;
  DROP TABLE "custom_pages_blocks_faq" CASCADE;
  DROP TABLE "custom_pages_blocks_faq_locales" CASCADE;
  DROP TABLE "custom_pages_blocks_cta" CASCADE;
  DROP TABLE "custom_pages_blocks_cta_locales" CASCADE;
  DROP TABLE "custom_pages" CASCADE;
  DROP TABLE "custom_pages_locales" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_split_body" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_split_facts" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_split_bullets" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_split" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_split_locales" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_facts_items" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_facts" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_facts_locales" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_statement" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_statement_locales" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_gallery_locales" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_final_booking" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_final_booking_locales" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_arrival_transport" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_arrival" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_arrival_locales" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_contact" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_contact_locales" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_room_list" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_offers_items" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_offers_items_locales" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_offers" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_offers_locales" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_custom_pages_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_custom_pages_v" CASCADE;
  DROP TABLE "_custom_pages_v_locales" CASCADE;
  DROP TABLE "rooms_description" CASCADE;
  DROP TABLE "rooms_highlights" CASCADE;
  DROP TABLE "rooms_amenities" CASCADE;
  DROP TABLE "rooms_gallery" CASCADE;
  DROP TABLE "rooms" CASCADE;
  DROP TABLE "rooms_locales" CASCADE;
  DROP TABLE "_rooms_v_version_description" CASCADE;
  DROP TABLE "_rooms_v_version_highlights" CASCADE;
  DROP TABLE "_rooms_v_version_amenities" CASCADE;
  DROP TABLE "_rooms_v_version_gallery" CASCADE;
  DROP TABLE "_rooms_v" CASCADE;
  DROP TABLE "_rooms_v_locales" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "navigation_items" CASCADE;
  DROP TABLE "navigation_items_locales" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "navigation_locales" CASCADE;
  DROP TABLE "_navigation_v_version_items" CASCADE;
  DROP TABLE "_navigation_v_version_items_locales" CASCADE;
  DROP TABLE "_navigation_v" CASCADE;
  DROP TABLE "_navigation_v_locales" CASCADE;
  DROP TABLE "footer_social" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "_footer_v_version_social" CASCADE;
  DROP TABLE "_footer_v" CASCADE;
  DROP TABLE "_footer_v_locales" CASCADE;
  DROP TABLE "homepage_spa_facts" CASCADE;
  DROP TABLE "homepage_location_facts" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_locales" CASCADE;
  DROP TABLE "_homepage_v_version_spa_facts" CASCADE;
  DROP TABLE "_homepage_v_version_location_facts" CASCADE;
  DROP TABLE "_homepage_v" CASCADE;
  DROP TABLE "_homepage_v_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_pages_blocks_hero_image_static_path";
  DROP TYPE "public"."enum_pages_blocks_split_tone";
  DROP TYPE "public"."enum_pages_blocks_split_line";
  DROP TYPE "public"."enum_pages_blocks_split_image1_static_path";
  DROP TYPE "public"."enum_pages_blocks_split_image2_static_path";
  DROP TYPE "public"."enum_pages_blocks_split_primary_link_kind";
  DROP TYPE "public"."enum_pages_blocks_split_secondary_link_kind";
  DROP TYPE "public"."enum_pages_blocks_statement_tone";
  DROP TYPE "public"."enum_pages_blocks_gallery_images_image_static_path";
  DROP TYPE "public"."enum_pages_blocks_gallery_tone";
  DROP TYPE "public"."enum_pages_blocks_final_booking_image_static_path";
  DROP TYPE "public"."enum_pages_blocks_offers_items_image_static_path";
  DROP TYPE "public"."enum_pages_blocks_offers_items_cta_link_kind";
  DROP TYPE "public"."enum_pages_blocks_offers_tone";
  DROP TYPE "public"."enum_pages_blocks_faq_tone";
  DROP TYPE "public"."enum_pages_blocks_cta_tone";
  DROP TYPE "public"."enum_pages_blocks_cta_primary_link_kind";
  DROP TYPE "public"."enum_pages_blocks_cta_secondary_link_kind";
  DROP TYPE "public"."enum_pages_og_image_static_path";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_image_static_path";
  DROP TYPE "public"."enum__pages_v_blocks_split_tone";
  DROP TYPE "public"."enum__pages_v_blocks_split_line";
  DROP TYPE "public"."enum__pages_v_blocks_split_image1_static_path";
  DROP TYPE "public"."enum__pages_v_blocks_split_image2_static_path";
  DROP TYPE "public"."enum__pages_v_blocks_split_primary_link_kind";
  DROP TYPE "public"."enum__pages_v_blocks_split_secondary_link_kind";
  DROP TYPE "public"."enum__pages_v_blocks_statement_tone";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_tone";
  DROP TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path";
  DROP TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path";
  DROP TYPE "public"."enum__pages_v_blocks_offers_items_cta_link_kind";
  DROP TYPE "public"."enum__pages_v_blocks_offers_tone";
  DROP TYPE "public"."enum__pages_v_blocks_faq_tone";
  DROP TYPE "public"."enum__pages_v_blocks_cta_tone";
  DROP TYPE "public"."enum__pages_v_blocks_cta_primary_link_kind";
  DROP TYPE "public"."enum__pages_v_blocks_cta_secondary_link_kind";
  DROP TYPE "public"."enum__pages_v_version_og_image_static_path";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_custom_pages_blocks_hero_image_static_path";
  DROP TYPE "public"."enum_custom_pages_blocks_split_tone";
  DROP TYPE "public"."enum_custom_pages_blocks_split_line";
  DROP TYPE "public"."enum_custom_pages_blocks_split_image1_static_path";
  DROP TYPE "public"."enum_custom_pages_blocks_split_image2_static_path";
  DROP TYPE "public"."enum_custom_pages_blocks_split_primary_link_kind";
  DROP TYPE "public"."enum_custom_pages_blocks_split_secondary_link_kind";
  DROP TYPE "public"."enum_custom_pages_blocks_statement_tone";
  DROP TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path";
  DROP TYPE "public"."enum_custom_pages_blocks_gallery_tone";
  DROP TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path";
  DROP TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path";
  DROP TYPE "public"."enum_custom_pages_blocks_offers_items_cta_link_kind";
  DROP TYPE "public"."enum_custom_pages_blocks_offers_tone";
  DROP TYPE "public"."enum_custom_pages_blocks_faq_tone";
  DROP TYPE "public"."enum_custom_pages_blocks_cta_tone";
  DROP TYPE "public"."enum_custom_pages_blocks_cta_primary_link_kind";
  DROP TYPE "public"."enum_custom_pages_blocks_cta_secondary_link_kind";
  DROP TYPE "public"."enum_custom_pages_og_image_static_path";
  DROP TYPE "public"."enum_custom_pages_status";
  DROP TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path";
  DROP TYPE "public"."enum__custom_pages_v_blocks_split_tone";
  DROP TYPE "public"."enum__custom_pages_v_blocks_split_line";
  DROP TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path";
  DROP TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path";
  DROP TYPE "public"."enum__custom_pages_v_blocks_split_primary_link_kind";
  DROP TYPE "public"."enum__custom_pages_v_blocks_split_secondary_link_kind";
  DROP TYPE "public"."enum__custom_pages_v_blocks_statement_tone";
  DROP TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path";
  DROP TYPE "public"."enum__custom_pages_v_blocks_gallery_tone";
  DROP TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path";
  DROP TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path";
  DROP TYPE "public"."enum__custom_pages_v_blocks_offers_items_cta_link_kind";
  DROP TYPE "public"."enum__custom_pages_v_blocks_offers_tone";
  DROP TYPE "public"."enum__custom_pages_v_blocks_faq_tone";
  DROP TYPE "public"."enum__custom_pages_v_blocks_cta_tone";
  DROP TYPE "public"."enum__custom_pages_v_blocks_cta_primary_link_kind";
  DROP TYPE "public"."enum__custom_pages_v_blocks_cta_secondary_link_kind";
  DROP TYPE "public"."enum__custom_pages_v_version_og_image_static_path";
  DROP TYPE "public"."enum__custom_pages_v_version_status";
  DROP TYPE "public"."enum__custom_pages_v_published_locale";
  DROP TYPE "public"."enum_rooms_status";
  DROP TYPE "public"."enum__rooms_v_version_status";
  DROP TYPE "public"."enum__rooms_v_published_locale";
  DROP TYPE "public"."enum_navigation_status";
  DROP TYPE "public"."enum__navigation_v_version_status";
  DROP TYPE "public"."enum__navigation_v_published_locale";
  DROP TYPE "public"."enum_footer_social_link_kind";
  DROP TYPE "public"."enum_footer_status";
  DROP TYPE "public"."enum__footer_v_version_social_link_kind";
  DROP TYPE "public"."enum__footer_v_version_status";
  DROP TYPE "public"."enum__footer_v_published_locale";
  DROP TYPE "public"."enum_homepage_og_image_static_path";
  DROP TYPE "public"."enum_homepage_hero_image_static_path";
  DROP TYPE "public"."enum_homepage_hotel_image_left_static_path";
  DROP TYPE "public"."enum_homepage_hotel_image_center_static_path";
  DROP TYPE "public"."enum_homepage_hotel_image_right_static_path";
  DROP TYPE "public"."enum_homepage_spa_image_main_static_path";
  DROP TYPE "public"."enum_homepage_spa_image_secondary_static_path";
  DROP TYPE "public"."enum_homepage_restaurant_image_main_static_path";
  DROP TYPE "public"."enum_homepage_restaurant_image_coffee_static_path";
  DROP TYPE "public"."enum_homepage_restaurant_image_buffet_static_path";
  DROP TYPE "public"."enum_homepage_location_image_static_path";
  DROP TYPE "public"."enum_homepage_events_image_main_static_path";
  DROP TYPE "public"."enum_homepage_events_image_secondary_static_path";
  DROP TYPE "public"."enum_homepage_final_image_static_path";
  DROP TYPE "public"."enum_homepage_status";
  DROP TYPE "public"."enum__homepage_v_version_og_image_static_path";
  DROP TYPE "public"."enum__homepage_v_version_hero_image_static_path";
  DROP TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path";
  DROP TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path";
  DROP TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path";
  DROP TYPE "public"."enum__homepage_v_version_spa_image_main_static_path";
  DROP TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path";
  DROP TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path";
  DROP TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path";
  DROP TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path";
  DROP TYPE "public"."enum__homepage_v_version_location_image_static_path";
  DROP TYPE "public"."enum__homepage_v_version_events_image_main_static_path";
  DROP TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path";
  DROP TYPE "public"."enum__homepage_v_version_final_image_static_path";
  DROP TYPE "public"."enum__homepage_v_version_status";
  DROP TYPE "public"."enum__homepage_v_published_locale";`)
}
