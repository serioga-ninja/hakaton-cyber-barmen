import config from '../Core/config';
import { IDictionary } from '../Core/interfaces';
import { IResponseData, Request } from '../Core/request';

export class DeviceConnector {

  baseUrl = config.DEVICE_URL;

  private doRequest<T>(url: string, body: IDictionary): Promise<IResponseData<T>> {
    return new Request({ url: `${this.baseUrl}/${url}`, json: true })
      .post<T>(body);
  }

  addOrder(id: number) {
    return this.doRequest(`api/device/order/${id}`, {});
  }

  startPipe(id: number) {
    return this.doRequest(`api/device/start-pipe`, { id });
  }

  stopPipe(id: number) {
    return this.doRequest(`api/device/stop-pipe`, { id });
  }
}

const deviceConnector = new DeviceConnector();

export default deviceConnector;
