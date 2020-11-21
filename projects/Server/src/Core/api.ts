import { Application, Request, Response } from 'express';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { MongoConnection } from '../Database/connections';
import mongoConnectionOptions from '../Database/ormconfig';
import { IRequest, IResponse } from './interfaces';

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
  }

  protected async getOne(request: IRequest, response: IResponse) {
    const id = request.params.id;
    const res = await MongoConnection
      .getRepository(this.entity)
      .findOne(id);

    response.json(res);
  }

  protected async getMany(request: IRequest, response: IResponse) {
    const res = await MongoConnection
      .getRepository(this.entity)
      .find();

    response.json(res);
  }

  protected async create(request: IRequest, response: IResponse) {
    const res = await MongoConnection
      .getRepository(this.entity)
      .create(request.body);

    response.json(res);
  }

  protected async update(request: IRequest, response: IResponse) {
    const res = await MongoConnection
      .getRepository(this.entity)
      .save(request.body);

    response.json(res);
  }
}
