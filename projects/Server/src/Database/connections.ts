import { createConnection } from 'typeorm';
import { Connection } from 'typeorm/connection/Connection';
import connectionOptions from './ormconfig';

export let dbConnection: Connection;

export const createAllConnections = async () => {
  dbConnection = await createConnection(connectionOptions);
};
