import { Application } from 'express';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { dbConnection } from '../Database/connections';
import { ICreateRequest, IGetManyRequest, IGetOneRequest, IResponse, IUpdateRequest } from './interfaces';

export interface IApiOptions {
  baseUrl: string;
}

export abstract class Api<T = any> {
  abstract entity?: EntityTarget<T>;

  constructor(protected options: IApiOptions) {
  }


  register(app: Application) {
    const { baseUrl } = this.options;
    const prefix = 'api';

    app.get(`/${prefix}/${baseUrl}`, this.getMany.bind(this));
    app.get(`/${prefix}/${baseUrl}/:id`, this.getOne.bind(this));
    app.post(`/${prefix}/${baseUrl}`, this.create.bind(this));
    app.put(`/${prefix}/${baseUrl}/:id`, this.update.bind(this));
    app.delete(`/${prefix}/${baseUrl}/:id`, this.delete.bind(this));
  }

  protected async getOne(request: IGetOneRequest, response: IResponse) {
    const id = request.params.id;
    const res = await dbConnection
      .getRepository(this.entity)
      .findOne(id);

    response.json(res);
  }

  protected async getMany(request: IGetManyRequest, response: IResponse) {
    const res = await dbConnection
      .getRepository(this.entity)
      .find();

    response.json(res);
  }

  protected async create(request: ICreateRequest<T>, response: IResponse) {
    const res = await dbConnection
      .getRepository(this.entity)
      .create(request.body);

    response.json(res);
  }

  protected async update(request: IUpdateRequest<any>, response: IResponse) {
    const res = await dbConnection
      .getRepository(this.entity)
      .save(request.body);

    response.json(res);
  }

  protected async delete(request: IUpdateRequest<any>, response: IResponse) {
    const id = request.params.id;
    const repository = dbConnection
      .getRepository(this.entity);

    const res = await repository.findOne(id);

    await repository.delete(id);

    response.json(res);
  }
}
