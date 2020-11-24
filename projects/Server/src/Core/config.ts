import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  DEVICE_URL: process.env.DEVICE_URL || 'http://localhost:3001'
};


export default config;
