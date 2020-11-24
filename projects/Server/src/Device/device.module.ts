import { Module } from '../Core';
import { DeviceApi } from './device-api';
import deviceLogic, { DeviceLogic } from './device.logic';
import { DeviceOrdersQueue } from './device.orders-queue';

export class DeviceModule extends Module {
  deviceLogic: DeviceLogic;
  orderQueue: DeviceOrdersQueue;

  constructor() {
    super();

    this.orderQueue = new DeviceOrdersQueue();
    this.api = new DeviceApi(this.orderQueue) as any;
  }

  register(app) {
    this.deviceLogic = deviceLogic;
    this.api.register(app);
  }
}
