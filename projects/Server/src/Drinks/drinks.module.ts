import { Application } from 'express';
import { Module } from '../Core';
import { DrinksApi } from './drinks.api';

export class DrinksModule extends Module {
  constructor() {
    super();

    this.api = new DrinksApi();
  }

  register(app?: Application) {
    this.api.register(app);
  }
}
