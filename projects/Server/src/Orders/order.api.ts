import { Api } from '../Core';
import { ICreateRequest, IResponse } from '../Core/interfaces';
import { Order } from '../Database/entities/Order';
import { OrdersLogic } from './orders.logic';

export class OrdersApi extends Api {
  protected ordersLogic: OrdersLogic;
  protected entity: typeof Order;

  constructor() {
    super({ baseUrl: 'orders' });

    this.ordersLogic = new OrdersLogic();
    this.entity = Order;
  }

  protected async create(request: ICreateRequest<{ cocktailId }>, response: IResponse): Promise<void> {
    const { cocktailId } = request.body;
    const order = await this.ordersLogic.createOrder(cocktailId);

    response.json(order);
  }
}
