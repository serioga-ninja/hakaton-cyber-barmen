import { IDictionary } from '../Core/interfaces';
import { IResponseData, Request } from '../Core/request';
import { ServerStreamEvent } from './server-stream-events';

export class NotificationsConnector {

  private baseUrl = `http://localhost:3002`;

  private doRequest<T>(url: string, body: IDictionary): Promise<IResponseData<T>> {
    return new Request({ url: `${this.baseUrl}/${url}`, json: true })
      .post<T>(body);
  }

  notify(notification: ServerStreamEvent) {
    this.doRequest(`api/notification`, notification);
  }

}

const notificationsConnector = new NotificationsConnector();

export default notificationsConnector;
