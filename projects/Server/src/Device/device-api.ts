import { Application, Request, Response } from 'express';
import { DeviceOrdersQueue } from './device.orders-queue';

export class DeviceApi {
  constructor(private orderQueue: DeviceOrdersQueue) {
  }

  register(app: Application) {
    app.post('/api/order/:id', (request: Request<{ id: number; }>, response: Response) => {
      const { id } = request.params;

      this.orderQueue.add(id);

      response.sendStatus(200);
    });
  }
}
