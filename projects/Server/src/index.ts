import * as bodyParser from 'body-parser';
import { Application } from 'express';
import * as express from 'express';
import * as http from 'http';
import 'reflect-metadata';
import { CocktailsModule } from './Cocktails';
import { TFunc } from './Core/types';
import { createAllConnections } from './Database/connections';
import { DrinksModule } from './Drinks';

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