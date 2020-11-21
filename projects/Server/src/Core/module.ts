import { Application } from 'express';
import { Api } from './api';

export abstract class Module {
  protected api?: Api;

  abstract register(app?: Application): void;
}
