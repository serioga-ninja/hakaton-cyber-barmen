import { Request, Response } from 'express';

export interface IDictionary<T = any> {
  [key: string]: T;
}

export interface IResponse extends Response {

}


export interface ICreateRequest<TBody> extends Request<null, any, TBody, null> {

}

export interface IUpdateRequest<TBody> extends Request<{ id: number }, any, TBody, null> {

}

export interface IGetOneRequest extends Request<{ id: number }, any, null, null> {

}

export interface IGetManyRequest extends Request<null, any, null, null> {

}
