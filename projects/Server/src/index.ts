import * as bodyParser from 'body-parser';
import { Application } from 'express';
import * as express from 'express';
import * as http from 'http';
import 'reflect-metadata';
import * as path from 'path';
import { CocktailsModule } from './Cocktails';
import config from './Core/config';
import { EventTypes, ServerStreamEvent } from './Notifications/server-stream-events';
import { TFunc } from './Core/types';
import { createAllConnections } from './Database/ormconfig';
import { DrinksModule } from './Drinks';
import notificationsConnector from './Notifications/notifications.connector';
import { OrderModule } from './Orders/order.module';
import { PipesModule } from './Pipes/pipes.module';

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
    this.express.use((req, res, next) => {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Vary', 'Origin');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

      // Pass to next layer of middleware
      next();
    });
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(express.static(config.CLIENT_BUILD_FOLDER()));
  }

  private register() {
    new DrinksModule().register(this.express);
    new CocktailsModule().register(this.express);
    new OrderModule().register(this.express);
    new PipesModule().register(this.express);

    this.express.get('/', (request, response) => {
      response.sendFile(path.resolve(config.CLIENT_BUILD_FOLDER(), 'index.html'));
    });
  }

  run(callback: TFunc) {
    http
      .createServer(this.express)
      .listen(config.API_PORT, '0.0.0.0', callback);
  }
}

const server = new Server();
server.init();
server.run(async () => {
  await createAllConnections();

  console.log(`Server init done, http://localhost:${config.API_PORT}`);


  notificationsConnector.notify(new ServerStreamEvent(EventTypes.API_SERSVER_START, { time: new Date().getTime() }));
})
