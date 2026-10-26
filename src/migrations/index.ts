import * as migration_20261023_174329_initial_postgres from './20261023_174329_initial_postgres';
import * as migration_20261026_092546_hotel_info from './20261026_092546_hotel_info';

export const migrations = [
  {
    up: migration_20261023_174329_initial_postgres.up,
    down: migration_20261023_174329_initial_postgres.down,
    name: '20261023_174329_initial_postgres',
  },
  {
    up: migration_20261026_092546_hotel_info.up,
    down: migration_20261026_092546_hotel_info.down,
    name: '20261026_092546_hotel_info'
  },
];
