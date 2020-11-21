import { Application } from 'express';
import { Module } from '../Core';
import { OrdersApi } from './order.api';

export class OrderModule extends Module {

  constructor() {
    super();

    this.api = new OrdersApi();
  }

  register(app?: Application) {
    this.api.register(app);
  }
}
