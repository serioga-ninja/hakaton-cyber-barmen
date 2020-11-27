import * as bodyParser from 'body-parser';
import { Application } from 'express';
import * as express from 'express';
import * as http from 'http';
import 'reflect-metadata';
import config from '../Core/config';
import { ServerStream } from './server.stream';
import { TFunc } from '../Core/types';
import { NotificationsApi } from './notifications-api';

const port = 3002;

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
    new NotificationsApi().register(this.express);
    ServerStream.getInstance(this.express, {
      retry: 10000
    });
  }

  run(callback: TFunc) {
    http
      .createServer(this.express)
      .listen(config.NOTIFICATIONS_API_PORT, '0.0.0.0', callback);
  }
}

const server = new Server();
server.init();
server.run(async () => {
  console.log(`Server init done, http://localhost:${config.NOTIFICATIONS_API_PORT}`);
})
