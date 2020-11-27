import { Application, Request, Response } from 'express';
import logger from '../Core/logger';
import { ServerStreamEvent } from './server-stream-events';
import { CustomEventTypes, eventEmitterInstance } from './server.stream';

export class NotificationsApi {
  register(app: Application) {
    app.post('/api/notification', (request: Request<null, ServerStreamEvent>, response: Response) => {
      logger.debug(`New Notification: `, request.body);
      eventEmitterInstance.emit(CustomEventTypes.SEND_DATA, request.body);

      response.sendStatus(200);
    });
  }
}
