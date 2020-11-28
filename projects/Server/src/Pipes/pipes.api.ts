import { Api } from '../Core';
import { IGetManyRequest, IGetOneRequest, IResponse } from '../Core/interfaces';
import { Pipe } from '../Database/entities/Pipe';
import { dbConnection } from '../Database/ormconfig';
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

  protected async getMany(request: IGetManyRequest, response: IResponse): Promise<void> {
    const res = await dbConnection
      .getRepository(this.entity)
      .find({
        relations: ['drink']
      })
    ;

    response.json(res);
  }

  protected async getOne(request: IGetOneRequest, response: IResponse) {
    const id = request.params.id;
    const res = await dbConnection
      .getRepository(this.entity)
      .findOne(
        id,
        {
          relations: ['drink']
        });

    response.json(res);
  }

}
