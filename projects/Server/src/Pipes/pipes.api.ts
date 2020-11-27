import { Api } from '../Core';
import { Pipe } from '../Database/entities/Pipe';
import deviceConnector from '../Device/device.connector';

export class PipesApi extends Api {

  protected entity: typeof Pipe;

  get routes() {
    return [
      {
        url: 'start',
        needId: true,
        cb: this.runPipe,
        method: 'get'
      },
      {
        url: 'stop',
        needId: true,
        cb: this.stopPipe,
        method: 'get'
      },
    ]
  }

  constructor() {
    super({ baseUrl: 'pipes' });

    this.entity = Pipe;
  }

  runPipe(request, response) {
    deviceConnector.startPipe(request.params.id);

    response.sendStatus(200);
  }

  stopPipe(request, response) {
    deviceConnector.stopPipe(request.params.id);

    response.sendStatus(200);
  }

}
