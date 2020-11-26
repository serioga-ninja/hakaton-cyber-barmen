import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  DEVICE_URL: process.env.DEVICE_URL || 'http://localhost:3001',

  DB_PORT: process.env.DB_PORT,
  DB_TYPE: process.env.DB_TYPE as 'sqlite3' | 'postgres',
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
};


export default config;
