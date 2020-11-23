import logger from '../Core/logger';
import { Order } from '../Database/entities/Order';
import deviceLogic from '../Device/device.logic';

export class OrdersQueue {
  protected inProgress: boolean = false;

  private items: Order[];

  constructor() {
    this.items = [];
  }

  add(order: Order) {
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
        logger.error(`Queue error on exercise: ${JSON.stringify(order)}`);
      }
    }
    logger.info(`Queue finished`);
    this.inProgress = false;
  }
}
