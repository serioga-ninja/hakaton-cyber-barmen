import logger from '../Core/logger';
import { dbConnection } from '../Database/connections';
import { Order } from '../Database/entities/Order';
import deviceLogic from './device.logic';

export class DeviceOrdersQueue {
  protected inProgress: boolean = false;

  private items: Order[];

  constructor() {
    this.items = [];
  }

  async add(id: number) {
    const order = await dbConnection
      .getRepository(Order)
      .findOne({
        where: { id: id },
        relations: ['cocktail', 'cocktail.components', 'cocktail.components.drink']
      });

    this.items.push(order);

    if (!this.inProgress) {
      this.work();
    }
  }

  async work() {
    this.inProgress = true;

    while (this.items.length > 0) {
      logger.info(`Queue length: ${this.items.length}`);
      const order = this.items.shift();
      try {
        await deviceLogic.prepareOrder(order);
      } catch (e) {
        logger.error(`Queue error on order: ${JSON.stringify(order)}`);
      }
    }
    logger.info(`Queue finished`);
    this.inProgress = false;
  }
}
