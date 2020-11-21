import { Api } from '../Core';
import { Drink } from '../Database/entities/Drink';
import { Order } from '../Database/entities/Order';

export class OrdersApi extends Api {
  entity: typeof Order;

  constructor() {
    super({ baseUrl: 'orders' });

    this.entity = Order;
  }
}
