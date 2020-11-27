import { Request, Response } from 'express';
import { Api, IRoute } from '../Core';
import deviceLogic from './device.logic';
import { DeviceOrdersQueue } from './device.orders-queue';

export class DeviceApi extends Api {
  entity = null;

  get routes() {
    return [
      {
        cb: this.startOrder,
        needId: false,
        method: 'post',
        url: 'order'
      },
      {
        cb: this.startPipe,
        needId: false,
        method: 'post',
        url: 'start-pipe'
      },
      {
        cb: this.stopPipe,
        needId: false,
        method: 'post',
        url: 'stop-pipe'
      },
    ] as IRoute[]
  }

  constructor(private orderQueue: DeviceOrdersQueue) {
    super({ baseUrl: 'device' });
  }

  startOrder(request: Request<null, { id: number; }>, response: Response) {
    const { id } = request.body;

    this.orderQueue.add(id);

    response.sendStatus(200);
  }

  startPipe(request: Request<null, { id: number; }>, response: Response) {
    const { id } = request.body;

    deviceLogic.startPipe(id);

    response.sendStatus(200);
  }

  stopPipe(request: Request<null, { id: number; }>, response: Response) {
    const { id } = request.body;

    deviceLogic.stopPipe(id);

    response.sendStatus(200);
  }


}
