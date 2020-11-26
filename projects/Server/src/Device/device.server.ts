import * as bodyParser from 'body-parser';
import { Application } from 'express';
import * as express from 'express';
import * as http from 'http';
import 'reflect-metadata';
import { TFunc } from '../Core/types';
import { createAllConnections } from '../Database/ormconfig';
import { DeviceModule } from './device.module';

class Server {
  private express: Application;

  constructor() {
    this.express = express();
  }

  init() {
    this.middleware();
    this.register();
  }

  private middleware() {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
  }

  private register() {
    new DeviceModule().register(this.express);
  }

  run(callback: TFunc) {
    http
      .createServer(this.express)
      .listen(3001, '0.0.0.0', callback);
  }
}

const server = new Server();
server.init();
server.run(async () => {
  await createAllConnections();

  console.log(`Server init done, http://localhost:3001`);
})
