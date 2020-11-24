import { dbConnection } from '../Database/connections';
import { Order } from '../Database/entities/Order';
import deviceConnector from '../Device/device.connector';
import { DeviceOrdersQueue } from '../Device/device.orders-queue';

export class OrdersLogic {
  private ordersQueue: DeviceOrdersQueue;

  constructor() {
    this.ordersQueue = new DeviceOrdersQueue();
  }

  async createOrder(cocktailId: number): Promise<Order> {
    const orderRepository = dbConnection
      .getRepository(Order);

    const res = await orderRepository
      .save({
        cocktailId: cocktailId
      });

    const order = await orderRepository
      .findOne({
        where: { id: res.id },
        relations: ['cocktail', 'cocktail.components', 'cocktail.components.drink']
      });

    deviceConnector.addOrder(order.id);

    return order;
  }
}
