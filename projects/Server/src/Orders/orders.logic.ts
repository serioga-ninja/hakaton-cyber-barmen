import { dbConnection } from '../Database/connections';
import { Order } from '../Database/entities/Order';
import { OrdersQueue } from './orders-queue';

export class OrdersLogic {
  private ordersQueue: OrdersQueue;

  constructor() {
    this.ordersQueue = new OrdersQueue();
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

    this.ordersQueue.add(order);

    return order;
  }
}
