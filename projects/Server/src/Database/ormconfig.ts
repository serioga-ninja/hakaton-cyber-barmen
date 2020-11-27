import * as path from 'path';
import { createConnection } from 'typeorm';
import { Connection } from 'typeorm/connection/Connection';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import config from '../Core/config';

const sqliteConnectionOptions: SqliteConnectionOptions = {
  'name': 'default',
  'type': 'sqlite',
  database: path.join(__dirname, `db.sqlite3`),
  'synchronize': false,
  entities: [path.join(__dirname, `entities/*{.ts,.js}`)],
  'migrations': [path.join(__dirname, `migrations/*{.ts,.js}`)],
  'subscribers': [path.join(__dirname, `subscribers/*{.ts,.js}`)],
  'cli': {
    'migrationsDir': 'migrations'
  },
  logging: true
};

const pgConnectionOptions: PostgresConnectionOptions = {
  'name': 'default',
  'type': 'postgres',

  port: parseInt(config.DB_PORT),
  host: config.DB_HOST,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,

  'synchronize': false,
  entities: [path.join(__dirname, `entities/*{.ts,.js}`)],
  'migrations': [path.join(__dirname, `migrations/*{.ts,.js}`)],
  'subscribers': [path.join(__dirname, `subscribers/*{.ts,.js}`)],
  'cli': {
    'migrationsDir': 'migrations'
  },
  logging: true
};

export let connectionOptions;

switch (config.DB_TYPE) {
  case 'postgres':
    connectionOptions = pgConnectionOptions;
    break;

  case 'sqlite3':
    connectionOptions = sqliteConnectionOptions;
    break;
}

export let dbConnection: Connection;
export const createAllConnections = async () => {
  dbConnection = await createConnection(connectionOptions);
};
