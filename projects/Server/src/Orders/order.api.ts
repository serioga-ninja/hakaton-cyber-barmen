import { Api } from '../Core';
import { ICreateRequest, IResponse } from '../Core/interfaces';
import { dbConnection } from '../Database/connections';
import { Order } from '../Database/entities/Order';

export class OrdersApi extends Api {
  entity: typeof Order;

  constructor() {
    super({ baseUrl: 'orders' });

    this.entity = Order;
  }

  protected async create(request: ICreateRequest<{ cocktailId }>, response: IResponse): Promise<void> {
    const res = await dbConnection
      .getRepository(this.entity)
      .save({
        cocktailId: request.body.cocktailId
      });

    response.json(res);
  }
}
