import { Application } from 'express';
import { Module } from '../Core';
import { PipesApi } from './pipes.api';

export class PipesModule extends Module {

  constructor() {
    super();

    this.api = new PipesApi();
  }

  register(app?: Application) {
    this.api.register(app);
  }
}
