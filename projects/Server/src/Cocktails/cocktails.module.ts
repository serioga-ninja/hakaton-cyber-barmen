import { Application } from 'express';
import { Module } from '../Core';
import { CocktailsApi } from './cocktails.api';

export class CocktailsModule extends Module {

  constructor() {
    super();

    this.api = new CocktailsApi();
  }


  register(app?: Application) {
    this.api.register(app);
  }

}
