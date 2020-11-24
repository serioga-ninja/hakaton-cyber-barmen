import logger from '../Core/logger';
import { Component } from '../Database/entities/Component';
import { Order } from '../Database/entities/Order';
import { Device } from './device';

class PipeProcess {
  private readonly timeToPour: number;

  constructor(private component: Component, private device: Device) {
    this.timeToPour = component.amount / component.drink.capacity;
  }

  run() {
    return new Promise<void>((resolve) => {
      logger.info(`Activating pipe for ${this.timeToPour} ms`, this.component.drink.pipe);
      this.device.activatePipe(this.component.drink.pipe);

      setTimeout(() => {
        logger.info('Deactivating pipe:', this.component.drink.pipe);
        this.device.deactivatePipe(this.component.drink.pipe);
        resolve();
      }, this.timeToPour);
    });
  }
}

export class DeviceLogic {

  private readonly device: Device;

  constructor() {
    this.device = new Device();
  }

  prepareOrder(order: Order) {
    return Promise.all(order.cocktail.components.map((component) => {
      return new PipeProcess(component, this.device).run();
    }))
  }
}

const deviceLogic = new DeviceLogic();
export default deviceLogic;
