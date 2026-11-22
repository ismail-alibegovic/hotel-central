import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_day_spa_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__day_spa_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__day_spa_v_published_locale" AS ENUM('en', 'bs');
  CREATE TYPE "public"."enum_fitness_club_classes_day" AS ENUM('0', '1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_fitness_club_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__fitness_club_v_version_classes_day" AS ENUM('0', '1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__fitness_club_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__fitness_club_v_published_locale" AS ENUM('en', 'bs');
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_pages_og_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__pages_v_version_og_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_custom_pages_og_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__custom_pages_v_version_og_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_og_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hero_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_left_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_center_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_hotel_image_right_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_main_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_spa_image_secondary_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_main_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_location_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_main_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_events_image_secondary_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum_homepage_final_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_og_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hero_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_location_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_main_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-bathroom.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-bed.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-cafe-corner.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-cafe-guest.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-cafe-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-conference-foyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-conference-u.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-conference.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-dayspa-corridor.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-dayspa-relax.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-doormat.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-facade-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-facade-sky.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-gym.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-keycard.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-lobby-entrance.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-lobby-lounge.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-lobby-windows.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-lobby.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-lounge-window.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-pool-jets.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-pool-lanes.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-reception-2.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-reception.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-restaurant.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-room-desk.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-room-door.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-spa-flyer.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-stairs.jpg' BEFORE 'img_9052.jpg';
  ALTER TYPE "public"."enum__homepage_v_version_final_image_static_path" ADD VALUE 'hc26-street-view.jpg' BEFORE 'img_9052.jpg';
  CREATE TABLE "day_spa_categories_treatments" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"duration" varchar,
  	"price" varchar
  );
  
  CREATE TABLE "day_spa_categories_treatments_locales" (
  	"name" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "day_spa_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" uuid
  );
  
  CREATE TABLE "day_spa_categories_locales" (
  	"name" varchar,
  	"summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "day_spa_packages_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "day_spa_packages_includes_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "day_spa_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"duration" varchar,
  	"price" varchar
  );
  
  CREATE TABLE "day_spa_packages_locales" (
  	"name" varchar,
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
  
  CREATE TABLE "_day_spa_v_version_categories_treatments" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"duration" varchar,
  	"price" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_day_spa_v_version_categories_treatments_locales" (
  	"name" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_day_spa_v_version_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"photo_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_day_spa_v_version_categories_locales" (
  	"name" varchar,
  	"summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_day_spa_v_version_packages_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_day_spa_v_version_packages_includes_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_day_spa_v_version_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"duration" varchar,
  	"price" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_day_spa_v_version_packages_locales" (
  	"name" varchar,
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
  
  CREATE TABLE "fitness_club_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "fitness_club_plans_features_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "fitness_club_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"price" varchar,
  	"highlight" boolean
  );
  
  CREATE TABLE "fitness_club_plans_locales" (
  	"name" varchar,
  	"period" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "fitness_club_classes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" "enum_fitness_club_classes_day",
  	"time" varchar,
  	"name" varchar,
  	"duration" varchar,
  	"trainer" varchar
  );
  
  CREATE TABLE "fitness_club_classes_locales" (
  	"room" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "fitness_club" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"timetable_image_id" uuid,
  	"_status" "enum_fitness_club_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "fitness_club_locales" (
  	"timetable_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_fitness_club_v_version_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_fitness_club_v_version_plans_features_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_fitness_club_v_version_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"price" varchar,
  	"highlight" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_fitness_club_v_version_plans_locales" (
  	"name" varchar,
  	"period" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_fitness_club_v_version_classes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"day" "enum__fitness_club_v_version_classes_day",
  	"time" varchar,
  	"name" varchar,
  	"duration" varchar,
  	"trainer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_fitness_club_v_version_classes_locales" (
  	"room" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_fitness_club_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_timetable_image_id" uuid,
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
  	"version_timetable_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  ALTER TABLE "day_spa_categories_treatments" ADD CONSTRAINT "day_spa_categories_treatments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."day_spa_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "day_spa_categories_treatments_locales" ADD CONSTRAINT "day_spa_categories_treatments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."day_spa_categories_treatments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "day_spa_categories" ADD CONSTRAINT "day_spa_categories_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "day_spa_categories" ADD CONSTRAINT "day_spa_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."day_spa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "day_spa_categories_locales" ADD CONSTRAINT "day_spa_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."day_spa_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "day_spa_packages_includes" ADD CONSTRAINT "day_spa_packages_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."day_spa_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "day_spa_packages_includes_locales" ADD CONSTRAINT "day_spa_packages_includes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."day_spa_packages_includes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "day_spa_packages" ADD CONSTRAINT "day_spa_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."day_spa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "day_spa_packages_locales" ADD CONSTRAINT "day_spa_packages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."day_spa_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_day_spa_v_version_categories_treatments" ADD CONSTRAINT "_day_spa_v_version_categories_treatments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_day_spa_v_version_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_day_spa_v_version_categories_treatments_locales" ADD CONSTRAINT "_day_spa_v_version_categories_treatments_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_day_spa_v_version_categories_treatments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_day_spa_v_version_categories" ADD CONSTRAINT "_day_spa_v_version_categories_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_day_spa_v_version_categories" ADD CONSTRAINT "_day_spa_v_version_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_day_spa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_day_spa_v_version_categories_locales" ADD CONSTRAINT "_day_spa_v_version_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_day_spa_v_version_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_day_spa_v_version_packages_includes" ADD CONSTRAINT "_day_spa_v_version_packages_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_day_spa_v_version_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_day_spa_v_version_packages_includes_locales" ADD CONSTRAINT "_day_spa_v_version_packages_includes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_day_spa_v_version_packages_includes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_day_spa_v_version_packages" ADD CONSTRAINT "_day_spa_v_version_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_day_spa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_day_spa_v_version_packages_locales" ADD CONSTRAINT "_day_spa_v_version_packages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_day_spa_v_version_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fitness_club_plans_features" ADD CONSTRAINT "fitness_club_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fitness_club_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fitness_club_plans_features_locales" ADD CONSTRAINT "fitness_club_plans_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fitness_club_plans_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fitness_club_plans" ADD CONSTRAINT "fitness_club_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fitness_club"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fitness_club_plans_locales" ADD CONSTRAINT "fitness_club_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fitness_club_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fitness_club_classes" ADD CONSTRAINT "fitness_club_classes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fitness_club"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fitness_club_classes_locales" ADD CONSTRAINT "fitness_club_classes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fitness_club_classes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fitness_club" ADD CONSTRAINT "fitness_club_timetable_image_id_media_id_fk" FOREIGN KEY ("timetable_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "fitness_club_locales" ADD CONSTRAINT "fitness_club_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fitness_club"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fitness_club_v_version_plans_features" ADD CONSTRAINT "_fitness_club_v_version_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fitness_club_v_version_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fitness_club_v_version_plans_features_locales" ADD CONSTRAINT "_fitness_club_v_version_plans_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fitness_club_v_version_plans_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fitness_club_v_version_plans" ADD CONSTRAINT "_fitness_club_v_version_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fitness_club_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fitness_club_v_version_plans_locales" ADD CONSTRAINT "_fitness_club_v_version_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fitness_club_v_version_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fitness_club_v_version_classes" ADD CONSTRAINT "_fitness_club_v_version_classes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fitness_club_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fitness_club_v_version_classes_locales" ADD CONSTRAINT "_fitness_club_v_version_classes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fitness_club_v_version_classes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fitness_club_v" ADD CONSTRAINT "_fitness_club_v_version_timetable_image_id_media_id_fk" FOREIGN KEY ("version_timetable_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_fitness_club_v_locales" ADD CONSTRAINT "_fitness_club_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fitness_club_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "day_spa_categories_treatments_order_idx" ON "day_spa_categories_treatments" USING btree ("_order");
  CREATE INDEX "day_spa_categories_treatments_parent_id_idx" ON "day_spa_categories_treatments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "day_spa_categories_treatments_locales_locale_parent_id_uniqu" ON "day_spa_categories_treatments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "day_spa_categories_treatments_locales_parent_id_idx" ON "day_spa_categories_treatments_locales" USING btree ("_parent_id");
  CREATE INDEX "day_spa_categories_order_idx" ON "day_spa_categories" USING btree ("_order");
  CREATE INDEX "day_spa_categories_parent_id_idx" ON "day_spa_categories" USING btree ("_parent_id");
  CREATE INDEX "day_spa_categories_photo_idx" ON "day_spa_categories" USING btree ("photo_id");
  CREATE UNIQUE INDEX "day_spa_categories_locales_locale_parent_id_unique" ON "day_spa_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "day_spa_categories_locales_parent_id_idx" ON "day_spa_categories_locales" USING btree ("_parent_id");
  CREATE INDEX "day_spa_packages_includes_order_idx" ON "day_spa_packages_includes" USING btree ("_order");
  CREATE INDEX "day_spa_packages_includes_parent_id_idx" ON "day_spa_packages_includes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "day_spa_packages_includes_locales_locale_parent_id_unique" ON "day_spa_packages_includes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "day_spa_packages_includes_locales_parent_id_idx" ON "day_spa_packages_includes_locales" USING btree ("_parent_id");
  CREATE INDEX "day_spa_packages_order_idx" ON "day_spa_packages" USING btree ("_order");
  CREATE INDEX "day_spa_packages_parent_id_idx" ON "day_spa_packages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "day_spa_packages_locales_locale_parent_id_unique" ON "day_spa_packages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "day_spa_packages_locales_parent_id_idx" ON "day_spa_packages_locales" USING btree ("_parent_id");
  CREATE INDEX "day_spa__status_idx" ON "day_spa" USING btree ("_status");
  CREATE INDEX "_day_spa_v_version_categories_treatments_order_idx" ON "_day_spa_v_version_categories_treatments" USING btree ("_order");
  CREATE INDEX "_day_spa_v_version_categories_treatments_parent_id_idx" ON "_day_spa_v_version_categories_treatments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_day_spa_v_version_categories_treatments_locales_locale_pare" ON "_day_spa_v_version_categories_treatments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_day_spa_v_version_categories_treatments_locales_parent__idx" ON "_day_spa_v_version_categories_treatments_locales" USING btree ("_parent_id");
  CREATE INDEX "_day_spa_v_version_categories_order_idx" ON "_day_spa_v_version_categories" USING btree ("_order");
  CREATE INDEX "_day_spa_v_version_categories_parent_id_idx" ON "_day_spa_v_version_categories" USING btree ("_parent_id");
  CREATE INDEX "_day_spa_v_version_categories_photo_idx" ON "_day_spa_v_version_categories" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_day_spa_v_version_categories_locales_locale_parent_id_uniqu" ON "_day_spa_v_version_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_day_spa_v_version_categories_locales_parent_id_idx" ON "_day_spa_v_version_categories_locales" USING btree ("_parent_id");
  CREATE INDEX "_day_spa_v_version_packages_includes_order_idx" ON "_day_spa_v_version_packages_includes" USING btree ("_order");
  CREATE INDEX "_day_spa_v_version_packages_includes_parent_id_idx" ON "_day_spa_v_version_packages_includes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_day_spa_v_version_packages_includes_locales_locale_parent_i" ON "_day_spa_v_version_packages_includes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_day_spa_v_version_packages_includes_locales_parent_id_idx" ON "_day_spa_v_version_packages_includes_locales" USING btree ("_parent_id");
  CREATE INDEX "_day_spa_v_version_packages_order_idx" ON "_day_spa_v_version_packages" USING btree ("_order");
  CREATE INDEX "_day_spa_v_version_packages_parent_id_idx" ON "_day_spa_v_version_packages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_day_spa_v_version_packages_locales_locale_parent_id_unique" ON "_day_spa_v_version_packages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_day_spa_v_version_packages_locales_parent_id_idx" ON "_day_spa_v_version_packages_locales" USING btree ("_parent_id");
  CREATE INDEX "_day_spa_v_version_version__status_idx" ON "_day_spa_v" USING btree ("version__status");
  CREATE INDEX "_day_spa_v_created_at_idx" ON "_day_spa_v" USING btree ("created_at");
  CREATE INDEX "_day_spa_v_updated_at_idx" ON "_day_spa_v" USING btree ("updated_at");
  CREATE INDEX "_day_spa_v_snapshot_idx" ON "_day_spa_v" USING btree ("snapshot");
  CREATE INDEX "_day_spa_v_published_locale_idx" ON "_day_spa_v" USING btree ("published_locale");
  CREATE INDEX "_day_spa_v_latest_idx" ON "_day_spa_v" USING btree ("latest");
  CREATE INDEX "_day_spa_v_autosave_idx" ON "_day_spa_v" USING btree ("autosave");
  CREATE INDEX "fitness_club_plans_features_order_idx" ON "fitness_club_plans_features" USING btree ("_order");
  CREATE INDEX "fitness_club_plans_features_parent_id_idx" ON "fitness_club_plans_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "fitness_club_plans_features_locales_locale_parent_id_unique" ON "fitness_club_plans_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "fitness_club_plans_features_locales_parent_id_idx" ON "fitness_club_plans_features_locales" USING btree ("_parent_id");
  CREATE INDEX "fitness_club_plans_order_idx" ON "fitness_club_plans" USING btree ("_order");
  CREATE INDEX "fitness_club_plans_parent_id_idx" ON "fitness_club_plans" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "fitness_club_plans_locales_locale_parent_id_unique" ON "fitness_club_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "fitness_club_plans_locales_parent_id_idx" ON "fitness_club_plans_locales" USING btree ("_parent_id");
  CREATE INDEX "fitness_club_classes_order_idx" ON "fitness_club_classes" USING btree ("_order");
  CREATE INDEX "fitness_club_classes_parent_id_idx" ON "fitness_club_classes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "fitness_club_classes_locales_locale_parent_id_unique" ON "fitness_club_classes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "fitness_club_classes_locales_parent_id_idx" ON "fitness_club_classes_locales" USING btree ("_parent_id");
  CREATE INDEX "fitness_club_timetable_image_idx" ON "fitness_club" USING btree ("timetable_image_id");
  CREATE INDEX "fitness_club__status_idx" ON "fitness_club" USING btree ("_status");
  CREATE UNIQUE INDEX "fitness_club_locales_locale_parent_id_unique" ON "fitness_club_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "fitness_club_locales_parent_id_idx" ON "fitness_club_locales" USING btree ("_parent_id");
  CREATE INDEX "_fitness_club_v_version_plans_features_order_idx" ON "_fitness_club_v_version_plans_features" USING btree ("_order");
  CREATE INDEX "_fitness_club_v_version_plans_features_parent_id_idx" ON "_fitness_club_v_version_plans_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_fitness_club_v_version_plans_features_locales_locale_parent" ON "_fitness_club_v_version_plans_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_fitness_club_v_version_plans_features_locales_parent_id_idx" ON "_fitness_club_v_version_plans_features_locales" USING btree ("_parent_id");
  CREATE INDEX "_fitness_club_v_version_plans_order_idx" ON "_fitness_club_v_version_plans" USING btree ("_order");
  CREATE INDEX "_fitness_club_v_version_plans_parent_id_idx" ON "_fitness_club_v_version_plans" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_fitness_club_v_version_plans_locales_locale_parent_id_uniqu" ON "_fitness_club_v_version_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_fitness_club_v_version_plans_locales_parent_id_idx" ON "_fitness_club_v_version_plans_locales" USING btree ("_parent_id");
  CREATE INDEX "_fitness_club_v_version_classes_order_idx" ON "_fitness_club_v_version_classes" USING btree ("_order");
  CREATE INDEX "_fitness_club_v_version_classes_parent_id_idx" ON "_fitness_club_v_version_classes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_fitness_club_v_version_classes_locales_locale_parent_id_uni" ON "_fitness_club_v_version_classes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_fitness_club_v_version_classes_locales_parent_id_idx" ON "_fitness_club_v_version_classes_locales" USING btree ("_parent_id");
  CREATE INDEX "_fitness_club_v_version_version_timetable_image_idx" ON "_fitness_club_v" USING btree ("version_timetable_image_id");
  CREATE INDEX "_fitness_club_v_version_version__status_idx" ON "_fitness_club_v" USING btree ("version__status");
  CREATE INDEX "_fitness_club_v_created_at_idx" ON "_fitness_club_v" USING btree ("created_at");
  CREATE INDEX "_fitness_club_v_updated_at_idx" ON "_fitness_club_v" USING btree ("updated_at");
  CREATE INDEX "_fitness_club_v_snapshot_idx" ON "_fitness_club_v" USING btree ("snapshot");
  CREATE INDEX "_fitness_club_v_published_locale_idx" ON "_fitness_club_v" USING btree ("published_locale");
  CREATE INDEX "_fitness_club_v_latest_idx" ON "_fitness_club_v" USING btree ("latest");
  CREATE INDEX "_fitness_club_v_autosave_idx" ON "_fitness_club_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_fitness_club_v_locales_locale_parent_id_unique" ON "_fitness_club_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_fitness_club_v_locales_parent_id_idx" ON "_fitness_club_v_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "day_spa_categories_treatments" CASCADE;
  DROP TABLE "day_spa_categories_treatments_locales" CASCADE;
  DROP TABLE "day_spa_categories" CASCADE;
  DROP TABLE "day_spa_categories_locales" CASCADE;
  DROP TABLE "day_spa_packages_includes" CASCADE;
  DROP TABLE "day_spa_packages_includes_locales" CASCADE;
  DROP TABLE "day_spa_packages" CASCADE;
  DROP TABLE "day_spa_packages_locales" CASCADE;
  DROP TABLE "day_spa" CASCADE;
  DROP TABLE "_day_spa_v_version_categories_treatments" CASCADE;
  DROP TABLE "_day_spa_v_version_categories_treatments_locales" CASCADE;
  DROP TABLE "_day_spa_v_version_categories" CASCADE;
  DROP TABLE "_day_spa_v_version_categories_locales" CASCADE;
  DROP TABLE "_day_spa_v_version_packages_includes" CASCADE;
  DROP TABLE "_day_spa_v_version_packages_includes_locales" CASCADE;
  DROP TABLE "_day_spa_v_version_packages" CASCADE;
  DROP TABLE "_day_spa_v_version_packages_locales" CASCADE;
  DROP TABLE "_day_spa_v" CASCADE;
  DROP TABLE "fitness_club_plans_features" CASCADE;
  DROP TABLE "fitness_club_plans_features_locales" CASCADE;
  DROP TABLE "fitness_club_plans" CASCADE;
  DROP TABLE "fitness_club_plans_locales" CASCADE;
  DROP TABLE "fitness_club_classes" CASCADE;
  DROP TABLE "fitness_club_classes_locales" CASCADE;
  DROP TABLE "fitness_club" CASCADE;
  DROP TABLE "fitness_club_locales" CASCADE;
  DROP TABLE "_fitness_club_v_version_plans_features" CASCADE;
  DROP TABLE "_fitness_club_v_version_plans_features_locales" CASCADE;
  DROP TABLE "_fitness_club_v_version_plans" CASCADE;
  DROP TABLE "_fitness_club_v_version_plans_locales" CASCADE;
  DROP TABLE "_fitness_club_v_version_classes" CASCADE;
  DROP TABLE "_fitness_club_v_version_classes_locales" CASCADE;
  DROP TABLE "_fitness_club_v" CASCADE;
  DROP TABLE "_fitness_club_v_locales" CASCADE;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_hero_image_static_path";
  CREATE TYPE "public"."enum_pages_blocks_hero_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "image_static_path" SET DATA TYPE "public"."enum_pages_blocks_hero_image_static_path" USING "image_static_path"::"public"."enum_pages_blocks_hero_image_static_path";
  ALTER TABLE "pages_blocks_split" ALTER COLUMN "image1_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_split_image1_static_path";
  CREATE TYPE "public"."enum_pages_blocks_split_image1_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "pages_blocks_split" ALTER COLUMN "image1_static_path" SET DATA TYPE "public"."enum_pages_blocks_split_image1_static_path" USING "image1_static_path"::"public"."enum_pages_blocks_split_image1_static_path";
  ALTER TABLE "pages_blocks_split" ALTER COLUMN "image2_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_split_image2_static_path";
  CREATE TYPE "public"."enum_pages_blocks_split_image2_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "pages_blocks_split" ALTER COLUMN "image2_static_path" SET DATA TYPE "public"."enum_pages_blocks_split_image2_static_path" USING "image2_static_path"::"public"."enum_pages_blocks_split_image2_static_path";
  ALTER TABLE "pages_blocks_gallery_images" ALTER COLUMN "image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_gallery_images_image_static_path";
  CREATE TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "pages_blocks_gallery_images" ALTER COLUMN "image_static_path" SET DATA TYPE "public"."enum_pages_blocks_gallery_images_image_static_path" USING "image_static_path"::"public"."enum_pages_blocks_gallery_images_image_static_path";
  ALTER TABLE "pages_blocks_final_booking" ALTER COLUMN "image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_final_booking_image_static_path";
  CREATE TYPE "public"."enum_pages_blocks_final_booking_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "pages_blocks_final_booking" ALTER COLUMN "image_static_path" SET DATA TYPE "public"."enum_pages_blocks_final_booking_image_static_path" USING "image_static_path"::"public"."enum_pages_blocks_final_booking_image_static_path";
  ALTER TABLE "pages_blocks_offers_items" ALTER COLUMN "image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_offers_items_image_static_path";
  CREATE TYPE "public"."enum_pages_blocks_offers_items_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "pages_blocks_offers_items" ALTER COLUMN "image_static_path" SET DATA TYPE "public"."enum_pages_blocks_offers_items_image_static_path" USING "image_static_path"::"public"."enum_pages_blocks_offers_items_image_static_path";
  ALTER TABLE "pages" ALTER COLUMN "og_image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_og_image_static_path";
  CREATE TYPE "public"."enum_pages_og_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "pages" ALTER COLUMN "og_image_static_path" SET DATA TYPE "public"."enum_pages_og_image_static_path" USING "og_image_static_path"::"public"."enum_pages_og_image_static_path";
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_hero_image_static_path";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "image_static_path" SET DATA TYPE "public"."enum__pages_v_blocks_hero_image_static_path" USING "image_static_path"::"public"."enum__pages_v_blocks_hero_image_static_path";
  ALTER TABLE "_pages_v_blocks_split" ALTER COLUMN "image1_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_split_image1_static_path";
  CREATE TYPE "public"."enum__pages_v_blocks_split_image1_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_pages_v_blocks_split" ALTER COLUMN "image1_static_path" SET DATA TYPE "public"."enum__pages_v_blocks_split_image1_static_path" USING "image1_static_path"::"public"."enum__pages_v_blocks_split_image1_static_path";
  ALTER TABLE "_pages_v_blocks_split" ALTER COLUMN "image2_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_split_image2_static_path";
  CREATE TYPE "public"."enum__pages_v_blocks_split_image2_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_pages_v_blocks_split" ALTER COLUMN "image2_static_path" SET DATA TYPE "public"."enum__pages_v_blocks_split_image2_static_path" USING "image2_static_path"::"public"."enum__pages_v_blocks_split_image2_static_path";
  ALTER TABLE "_pages_v_blocks_gallery_images" ALTER COLUMN "image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path";
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_pages_v_blocks_gallery_images" ALTER COLUMN "image_static_path" SET DATA TYPE "public"."enum__pages_v_blocks_gallery_images_image_static_path" USING "image_static_path"::"public"."enum__pages_v_blocks_gallery_images_image_static_path";
  ALTER TABLE "_pages_v_blocks_final_booking" ALTER COLUMN "image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path";
  CREATE TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_pages_v_blocks_final_booking" ALTER COLUMN "image_static_path" SET DATA TYPE "public"."enum__pages_v_blocks_final_booking_image_static_path" USING "image_static_path"::"public"."enum__pages_v_blocks_final_booking_image_static_path";
  ALTER TABLE "_pages_v_blocks_offers_items" ALTER COLUMN "image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path";
  CREATE TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_pages_v_blocks_offers_items" ALTER COLUMN "image_static_path" SET DATA TYPE "public"."enum__pages_v_blocks_offers_items_image_static_path" USING "image_static_path"::"public"."enum__pages_v_blocks_offers_items_image_static_path";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_og_image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_og_image_static_path";
  CREATE TYPE "public"."enum__pages_v_version_og_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_og_image_static_path" SET DATA TYPE "public"."enum__pages_v_version_og_image_static_path" USING "version_og_image_static_path"::"public"."enum__pages_v_version_og_image_static_path";
  ALTER TABLE "custom_pages_blocks_hero" ALTER COLUMN "image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_custom_pages_blocks_hero_image_static_path";
  CREATE TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "custom_pages_blocks_hero" ALTER COLUMN "image_static_path" SET DATA TYPE "public"."enum_custom_pages_blocks_hero_image_static_path" USING "image_static_path"::"public"."enum_custom_pages_blocks_hero_image_static_path";
  ALTER TABLE "custom_pages_blocks_split" ALTER COLUMN "image1_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_custom_pages_blocks_split_image1_static_path";
  CREATE TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "custom_pages_blocks_split" ALTER COLUMN "image1_static_path" SET DATA TYPE "public"."enum_custom_pages_blocks_split_image1_static_path" USING "image1_static_path"::"public"."enum_custom_pages_blocks_split_image1_static_path";
  ALTER TABLE "custom_pages_blocks_split" ALTER COLUMN "image2_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_custom_pages_blocks_split_image2_static_path";
  CREATE TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "custom_pages_blocks_split" ALTER COLUMN "image2_static_path" SET DATA TYPE "public"."enum_custom_pages_blocks_split_image2_static_path" USING "image2_static_path"::"public"."enum_custom_pages_blocks_split_image2_static_path";
  ALTER TABLE "custom_pages_blocks_gallery_images" ALTER COLUMN "image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path";
  CREATE TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "custom_pages_blocks_gallery_images" ALTER COLUMN "image_static_path" SET DATA TYPE "public"."enum_custom_pages_blocks_gallery_images_image_static_path" USING "image_static_path"::"public"."enum_custom_pages_blocks_gallery_images_image_static_path";
  ALTER TABLE "custom_pages_blocks_final_booking" ALTER COLUMN "image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path";
  CREATE TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "custom_pages_blocks_final_booking" ALTER COLUMN "image_static_path" SET DATA TYPE "public"."enum_custom_pages_blocks_final_booking_image_static_path" USING "image_static_path"::"public"."enum_custom_pages_blocks_final_booking_image_static_path";
  ALTER TABLE "custom_pages_blocks_offers_items" ALTER COLUMN "image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path";
  CREATE TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "custom_pages_blocks_offers_items" ALTER COLUMN "image_static_path" SET DATA TYPE "public"."enum_custom_pages_blocks_offers_items_image_static_path" USING "image_static_path"::"public"."enum_custom_pages_blocks_offers_items_image_static_path";
  ALTER TABLE "custom_pages" ALTER COLUMN "og_image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_custom_pages_og_image_static_path";
  CREATE TYPE "public"."enum_custom_pages_og_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "custom_pages" ALTER COLUMN "og_image_static_path" SET DATA TYPE "public"."enum_custom_pages_og_image_static_path" USING "og_image_static_path"::"public"."enum_custom_pages_og_image_static_path";
  ALTER TABLE "_custom_pages_v_blocks_hero" ALTER COLUMN "image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path";
  CREATE TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_custom_pages_v_blocks_hero" ALTER COLUMN "image_static_path" SET DATA TYPE "public"."enum__custom_pages_v_blocks_hero_image_static_path" USING "image_static_path"::"public"."enum__custom_pages_v_blocks_hero_image_static_path";
  ALTER TABLE "_custom_pages_v_blocks_split" ALTER COLUMN "image1_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path";
  CREATE TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_custom_pages_v_blocks_split" ALTER COLUMN "image1_static_path" SET DATA TYPE "public"."enum__custom_pages_v_blocks_split_image1_static_path" USING "image1_static_path"::"public"."enum__custom_pages_v_blocks_split_image1_static_path";
  ALTER TABLE "_custom_pages_v_blocks_split" ALTER COLUMN "image2_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path";
  CREATE TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_custom_pages_v_blocks_split" ALTER COLUMN "image2_static_path" SET DATA TYPE "public"."enum__custom_pages_v_blocks_split_image2_static_path" USING "image2_static_path"::"public"."enum__custom_pages_v_blocks_split_image2_static_path";
  ALTER TABLE "_custom_pages_v_blocks_gallery_images" ALTER COLUMN "image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path";
  CREATE TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_custom_pages_v_blocks_gallery_images" ALTER COLUMN "image_static_path" SET DATA TYPE "public"."enum__custom_pages_v_blocks_gallery_images_image_static_path" USING "image_static_path"::"public"."enum__custom_pages_v_blocks_gallery_images_image_static_path";
  ALTER TABLE "_custom_pages_v_blocks_final_booking" ALTER COLUMN "image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path";
  CREATE TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_custom_pages_v_blocks_final_booking" ALTER COLUMN "image_static_path" SET DATA TYPE "public"."enum__custom_pages_v_blocks_final_booking_image_static_path" USING "image_static_path"::"public"."enum__custom_pages_v_blocks_final_booking_image_static_path";
  ALTER TABLE "_custom_pages_v_blocks_offers_items" ALTER COLUMN "image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path";
  CREATE TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_custom_pages_v_blocks_offers_items" ALTER COLUMN "image_static_path" SET DATA TYPE "public"."enum__custom_pages_v_blocks_offers_items_image_static_path" USING "image_static_path"::"public"."enum__custom_pages_v_blocks_offers_items_image_static_path";
  ALTER TABLE "_custom_pages_v" ALTER COLUMN "version_og_image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__custom_pages_v_version_og_image_static_path";
  CREATE TYPE "public"."enum__custom_pages_v_version_og_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_custom_pages_v" ALTER COLUMN "version_og_image_static_path" SET DATA TYPE "public"."enum__custom_pages_v_version_og_image_static_path" USING "version_og_image_static_path"::"public"."enum__custom_pages_v_version_og_image_static_path";
  ALTER TABLE "homepage" ALTER COLUMN "og_image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_homepage_og_image_static_path";
  CREATE TYPE "public"."enum_homepage_og_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "homepage" ALTER COLUMN "og_image_static_path" SET DATA TYPE "public"."enum_homepage_og_image_static_path" USING "og_image_static_path"::"public"."enum_homepage_og_image_static_path";
  ALTER TABLE "homepage" ALTER COLUMN "hero_image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_homepage_hero_image_static_path";
  CREATE TYPE "public"."enum_homepage_hero_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "homepage" ALTER COLUMN "hero_image_static_path" SET DATA TYPE "public"."enum_homepage_hero_image_static_path" USING "hero_image_static_path"::"public"."enum_homepage_hero_image_static_path";
  ALTER TABLE "homepage" ALTER COLUMN "hotel_image_left_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_homepage_hotel_image_left_static_path";
  CREATE TYPE "public"."enum_homepage_hotel_image_left_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "homepage" ALTER COLUMN "hotel_image_left_static_path" SET DATA TYPE "public"."enum_homepage_hotel_image_left_static_path" USING "hotel_image_left_static_path"::"public"."enum_homepage_hotel_image_left_static_path";
  ALTER TABLE "homepage" ALTER COLUMN "hotel_image_center_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_homepage_hotel_image_center_static_path";
  CREATE TYPE "public"."enum_homepage_hotel_image_center_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "homepage" ALTER COLUMN "hotel_image_center_static_path" SET DATA TYPE "public"."enum_homepage_hotel_image_center_static_path" USING "hotel_image_center_static_path"::"public"."enum_homepage_hotel_image_center_static_path";
  ALTER TABLE "homepage" ALTER COLUMN "hotel_image_right_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_homepage_hotel_image_right_static_path";
  CREATE TYPE "public"."enum_homepage_hotel_image_right_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "homepage" ALTER COLUMN "hotel_image_right_static_path" SET DATA TYPE "public"."enum_homepage_hotel_image_right_static_path" USING "hotel_image_right_static_path"::"public"."enum_homepage_hotel_image_right_static_path";
  ALTER TABLE "homepage" ALTER COLUMN "spa_image_main_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_homepage_spa_image_main_static_path";
  CREATE TYPE "public"."enum_homepage_spa_image_main_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "homepage" ALTER COLUMN "spa_image_main_static_path" SET DATA TYPE "public"."enum_homepage_spa_image_main_static_path" USING "spa_image_main_static_path"::"public"."enum_homepage_spa_image_main_static_path";
  ALTER TABLE "homepage" ALTER COLUMN "spa_image_secondary_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_homepage_spa_image_secondary_static_path";
  CREATE TYPE "public"."enum_homepage_spa_image_secondary_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "homepage" ALTER COLUMN "spa_image_secondary_static_path" SET DATA TYPE "public"."enum_homepage_spa_image_secondary_static_path" USING "spa_image_secondary_static_path"::"public"."enum_homepage_spa_image_secondary_static_path";
  ALTER TABLE "homepage" ALTER COLUMN "restaurant_image_main_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_homepage_restaurant_image_main_static_path";
  CREATE TYPE "public"."enum_homepage_restaurant_image_main_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "homepage" ALTER COLUMN "restaurant_image_main_static_path" SET DATA TYPE "public"."enum_homepage_restaurant_image_main_static_path" USING "restaurant_image_main_static_path"::"public"."enum_homepage_restaurant_image_main_static_path";
  ALTER TABLE "homepage" ALTER COLUMN "restaurant_image_coffee_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_homepage_restaurant_image_coffee_static_path";
  CREATE TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "homepage" ALTER COLUMN "restaurant_image_coffee_static_path" SET DATA TYPE "public"."enum_homepage_restaurant_image_coffee_static_path" USING "restaurant_image_coffee_static_path"::"public"."enum_homepage_restaurant_image_coffee_static_path";
  ALTER TABLE "homepage" ALTER COLUMN "restaurant_image_buffet_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_homepage_restaurant_image_buffet_static_path";
  CREATE TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "homepage" ALTER COLUMN "restaurant_image_buffet_static_path" SET DATA TYPE "public"."enum_homepage_restaurant_image_buffet_static_path" USING "restaurant_image_buffet_static_path"::"public"."enum_homepage_restaurant_image_buffet_static_path";
  ALTER TABLE "homepage" ALTER COLUMN "location_image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_homepage_location_image_static_path";
  CREATE TYPE "public"."enum_homepage_location_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "homepage" ALTER COLUMN "location_image_static_path" SET DATA TYPE "public"."enum_homepage_location_image_static_path" USING "location_image_static_path"::"public"."enum_homepage_location_image_static_path";
  ALTER TABLE "homepage" ALTER COLUMN "events_image_main_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_homepage_events_image_main_static_path";
  CREATE TYPE "public"."enum_homepage_events_image_main_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "homepage" ALTER COLUMN "events_image_main_static_path" SET DATA TYPE "public"."enum_homepage_events_image_main_static_path" USING "events_image_main_static_path"::"public"."enum_homepage_events_image_main_static_path";
  ALTER TABLE "homepage" ALTER COLUMN "events_image_secondary_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_homepage_events_image_secondary_static_path";
  CREATE TYPE "public"."enum_homepage_events_image_secondary_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "homepage" ALTER COLUMN "events_image_secondary_static_path" SET DATA TYPE "public"."enum_homepage_events_image_secondary_static_path" USING "events_image_secondary_static_path"::"public"."enum_homepage_events_image_secondary_static_path";
  ALTER TABLE "homepage" ALTER COLUMN "final_image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum_homepage_final_image_static_path";
  CREATE TYPE "public"."enum_homepage_final_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "homepage" ALTER COLUMN "final_image_static_path" SET DATA TYPE "public"."enum_homepage_final_image_static_path" USING "final_image_static_path"::"public"."enum_homepage_final_image_static_path";
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_og_image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__homepage_v_version_og_image_static_path";
  CREATE TYPE "public"."enum__homepage_v_version_og_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_og_image_static_path" SET DATA TYPE "public"."enum__homepage_v_version_og_image_static_path" USING "version_og_image_static_path"::"public"."enum__homepage_v_version_og_image_static_path";
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_hero_image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__homepage_v_version_hero_image_static_path";
  CREATE TYPE "public"."enum__homepage_v_version_hero_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_hero_image_static_path" SET DATA TYPE "public"."enum__homepage_v_version_hero_image_static_path" USING "version_hero_image_static_path"::"public"."enum__homepage_v_version_hero_image_static_path";
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_hotel_image_left_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path";
  CREATE TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_hotel_image_left_static_path" SET DATA TYPE "public"."enum__homepage_v_version_hotel_image_left_static_path" USING "version_hotel_image_left_static_path"::"public"."enum__homepage_v_version_hotel_image_left_static_path";
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_hotel_image_center_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path";
  CREATE TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_hotel_image_center_static_path" SET DATA TYPE "public"."enum__homepage_v_version_hotel_image_center_static_path" USING "version_hotel_image_center_static_path"::"public"."enum__homepage_v_version_hotel_image_center_static_path";
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_hotel_image_right_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path";
  CREATE TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_hotel_image_right_static_path" SET DATA TYPE "public"."enum__homepage_v_version_hotel_image_right_static_path" USING "version_hotel_image_right_static_path"::"public"."enum__homepage_v_version_hotel_image_right_static_path";
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_spa_image_main_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__homepage_v_version_spa_image_main_static_path";
  CREATE TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_spa_image_main_static_path" SET DATA TYPE "public"."enum__homepage_v_version_spa_image_main_static_path" USING "version_spa_image_main_static_path"::"public"."enum__homepage_v_version_spa_image_main_static_path";
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_spa_image_secondary_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path";
  CREATE TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_spa_image_secondary_static_path" SET DATA TYPE "public"."enum__homepage_v_version_spa_image_secondary_static_path" USING "version_spa_image_secondary_static_path"::"public"."enum__homepage_v_version_spa_image_secondary_static_path";
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_restaurant_image_main_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path";
  CREATE TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_restaurant_image_main_static_path" SET DATA TYPE "public"."enum__homepage_v_version_restaurant_image_main_static_path" USING "version_restaurant_image_main_static_path"::"public"."enum__homepage_v_version_restaurant_image_main_static_path";
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_restaurant_image_coffee_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path";
  CREATE TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_restaurant_image_coffee_static_path" SET DATA TYPE "public"."enum__homepage_v_version_restaurant_image_coffee_static_path" USING "version_restaurant_image_coffee_static_path"::"public"."enum__homepage_v_version_restaurant_image_coffee_static_path";
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_restaurant_image_buffet_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path";
  CREATE TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_restaurant_image_buffet_static_path" SET DATA TYPE "public"."enum__homepage_v_version_restaurant_image_buffet_static_path" USING "version_restaurant_image_buffet_static_path"::"public"."enum__homepage_v_version_restaurant_image_buffet_static_path";
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_location_image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__homepage_v_version_location_image_static_path";
  CREATE TYPE "public"."enum__homepage_v_version_location_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_location_image_static_path" SET DATA TYPE "public"."enum__homepage_v_version_location_image_static_path" USING "version_location_image_static_path"::"public"."enum__homepage_v_version_location_image_static_path";
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_events_image_main_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__homepage_v_version_events_image_main_static_path";
  CREATE TYPE "public"."enum__homepage_v_version_events_image_main_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_events_image_main_static_path" SET DATA TYPE "public"."enum__homepage_v_version_events_image_main_static_path" USING "version_events_image_main_static_path"::"public"."enum__homepage_v_version_events_image_main_static_path";
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_events_image_secondary_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path";
  CREATE TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_events_image_secondary_static_path" SET DATA TYPE "public"."enum__homepage_v_version_events_image_secondary_static_path" USING "version_events_image_secondary_static_path"::"public"."enum__homepage_v_version_events_image_secondary_static_path";
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_final_image_static_path" SET DATA TYPE text;
  DROP TYPE "public"."enum__homepage_v_version_final_image_static_path";
  CREATE TYPE "public"."enum__homepage_v_version_final_image_static_path" AS ENUM('3064.jpg', '3067.jpg', '3069.jpg', '3073.jpg', '3075.jpg', 'bazen.jpg', 'breakfast1.jpg', 'breakfast2.jpg', 'breakfast3.jpg', 'central-spa_bath.jpg', 'central-spa_bathroom-1.jpg', 'central-spa_bathroom-2.jpg', 'central-spa_bathroom-3.jpg', 'central-spa_celulit-room.jpg', 'central-spa_relax-room-1.jpg', 'central-spa_relax-room-2.jpg', 'central-spa_relax-room-3.jpg', 'central-spa_relax-room.jpg', 'd01.jpg', 'dorucak1.jpg', 'dorucak2.jpg', 'dorucak3.jpg', 'dorucak4.jpg', 'dorucak5.jpg', 'dorucak6.jpg', 'dvo-nas-1.jpg', 'family1-new.jpg', 'family2-new.jpg', 'family3-new.jpg', 'family4-new.jpg', 'family5-new.jpg', 'final-6167.jpg', 'final-6173.jpg', 'final-6176.jpg', 'final-6181.jpg', 'final-6198.jpg', 'final-6202.jpg', 'final-6203.jpg', 'final-6211.jpg', 'final-6224.jpg', 'final-6230.jpg', 'hc-bg-lajna-1.jpg', 'hc-comfort-2.jpg', 'hc-naslovna-health-club.jpg', 'hc-spa-naslovna-interior.jpg', 'hc-spa-naslovna-opustanje.jpg', 'img_9052.jpg', 'img_9057.jpg', 'img_9064.jpg', 'img_9067.jpg', 'img_9069.jpg', 'img_9076.jpg', 'img_9085.jpg', 'img_9088.jpg', 'img_9124.jpg', 'img_9140.jpg', 'img_9177.jpg', 'img_9180.jpg', 'img_9183.jpg', 'img_9202.jpg', 'img_9210.jpg', 'img_9216.jpg', 'img_9217.jpg', 'img_9223.jpg', 'img_9226.jpg', 'img_9229.jpg', 'img_9232.jpg', 'img_9235.jpg', 'img_9236.jpg', 'img_9238.jpg', 'img_9247.jpg', 'img_9271.jpg', 'img_9277.jpg', 'img_9282.jpg', 'img_9289.jpg', 'jed-nas-1.jpg', 'junior01.jpg', 'junior02.jpg', 'junior03.jpg', 'p01.jpg', 'p02.jpg', 'p03.jpg', 'p04.jpg', 'p05.jpg', 'p06.jpg', 'p07.jpg', 'p08.jpg', 'p09.jpg', 'p10.jpg', 'p11.jpg', 'p12.jpg', 'p13.jpg', 'p14.jpg', 'pool-01.jpg', 'pool-02.jpg', 'pool-03.jpg', 'pool-04.jpg', 'pool-05.jpg', 'pool-06.jpg', 'pool-08.jpg', 'pre-nas-1.jpg', 's01.jpg', 's02.jpg', 's03.jpg', 's04.jpg', 's05.jpg', 's06.jpg', 's07.jpg', 's08.jpg', 's09.jpg', 's10.jpg', 's11.jpg', 's12.jpg', 'single-kupatilo.jpg', 'single-room.jpg', 'st-dvo-01.jpg', 'st-dvo-02.jpg', 'st-dvo-05.jpg', 'st-dvo-06.jpg');
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_final_image_static_path" SET DATA TYPE "public"."enum__homepage_v_version_final_image_static_path" USING "version_final_image_static_path"::"public"."enum__homepage_v_version_final_image_static_path";
  DROP TYPE "public"."enum_day_spa_status";
  DROP TYPE "public"."enum__day_spa_v_version_status";
  DROP TYPE "public"."enum__day_spa_v_published_locale";
  DROP TYPE "public"."enum_fitness_club_classes_day";
  DROP TYPE "public"."enum_fitness_club_status";
  DROP TYPE "public"."enum__fitness_club_v_version_classes_day";
  DROP TYPE "public"."enum__fitness_club_v_version_status";
  DROP TYPE "public"."enum__fitness_club_v_published_locale";`)
}
