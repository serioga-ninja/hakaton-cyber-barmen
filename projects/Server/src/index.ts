import * as bodyParser from 'body-parser';
import { Application } from 'express';
import * as express from 'express';
import * as http from 'http';
import 'reflect-metadata';
import { CocktailsModule } from './Cocktails';
import { TFunc } from './Core/types';
import { createAllConnections } from './Database/connections';
import { DeviceModule } from './Device/device.module';
import { DrinksModule } from './Drinks';
import { OrderModule } from './Orders/order.module';

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
    // this.express.use(session({
    //   secret: 'uuu',
    //   store: new MongoStore({
    //     url: connectionString
    //   })
    // }));
  }

  private register() {
    new DrinksModule().register(this.express);
    new CocktailsModule().register(this.express);
    new OrderModule().register(this.express);
    new DeviceModule().register();
  }

  run(callback: TFunc) {
    http
      .createServer(this.express)
      .listen(3000, '0.0.0.0', callback);
  }
}

const server = new Server();
server.init();
server.run(async () => {
  await createAllConnections();

  console.log(`Server init done, http://localhost:3000`);
})
