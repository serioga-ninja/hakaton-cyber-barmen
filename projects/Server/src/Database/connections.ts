import { createConnection } from 'typeorm';
import { Connection } from 'typeorm/connection/Connection';
import mongoConnectionOptions from './ormconfig';

export let MongoConnection: Connection;

export const createAllConnections = async () => {
  MongoConnection = await createConnection(mongoConnectionOptions);
};
