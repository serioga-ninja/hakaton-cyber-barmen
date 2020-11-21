import * as path from 'path';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const connectionOptions: SqliteConnectionOptions = {
  'name': 'default',
  'type': 'sqlite',
  database: path.join(__dirname, `db.sqlite3`),
  'synchronize': true,
  entities: [path.join(__dirname, `entities/*{.ts,.js}`)],
  'migrations': [path.join(__dirname, `migrations/*{.ts,.js}`)],
  'subscribers': [path.join(__dirname, `subscribers/*{.ts,.js}`)],
  'cli': {
    'migrationsDir': 'migrations'
  },
  logging: true
};

export default connectionOptions;
