import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

const config = {
  API_PORT: parseInt(process.env.API_PORT || '3000'),
  DEVICE_API_PORT: parseInt(process.env.DEVICE_API_PORT || '3001'),
  NOTIFICATIONS_API_PORT: parseInt(process.env.NOTIFICATIONS_API_PORT || '3002'),

  CLIENT_FOLDER: process.env.CLIENT_FOLDER || path.resolve(process.cwd(), '../../Client'),
  CLIENT_BUILD_FOLDER() {
    return path.join(this.CLIENT_FOLDER, 'dist', 'cyber-barmen')
  },

  DEVICE_URL: process.env.DEVICE_URL || 'http://localhost:3001',

  DB_PORT: process.env.DB_PORT,
  DB_TYPE: process.env.DB_TYPE as 'sqlite3' | 'postgres' || 'sqlite3',
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
};


export default config;
