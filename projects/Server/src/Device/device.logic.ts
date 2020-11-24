import logger from '../Core/logger';
import { dbConnection } from '../Database/connections';
import { Component } from '../Database/entities/Component';
import { Order } from '../Database/entities/Order';
import { Pipe } from '../Database/entities/Pipe';
import { Device } from './device';

class PipeProcess {
  private readonly timeToPour: number;

  constructor(private component: Component, private device: Device) {
    this.timeToPour = (component.amount / component.drink.capacity) * 1000;
  }

  run() {
    return new Promise<void>(async (resolve) => {
      const pipeRepo = dbConnection.getRepository(Pipe);
      const pipe = await pipeRepo.findOne({ where: { drinkId: this.component.drink.id } });

      logger.info(`Activating pipe for ${this.timeToPour} ms`, pipe);
      this.device.activatePipe(pipe);

      setTimeout(() => {
        logger.info('Deactivating pipe:', pipe);
        this.device.deactivatePipe(pipe);
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
