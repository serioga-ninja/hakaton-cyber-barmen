import { IncomingMessage } from 'http';
import * as http from 'http';
import { RequestOptions } from 'https';
import * as https from 'https';
import * as Url from 'url';
import { IDictionary } from './interfaces';

export interface IRequestOptions {
  url: string;
  json?: boolean;
  redirectAttempt?: number;
  badStatusCodeAsError?: boolean;
  method?: string;
  headers?: IDictionary;
}

export interface IResponseData<T> {
  data: T;
  res: IncomingMessage;
}

export class Request {

  private options: IRequestOptions;
  private requestOptions: RequestOptions;
  private protocol: any;
  private form: IDictionary;

  constructor(options: IRequestOptions) {
    this.options = options;

    this.options.redirectAttempt = this.options.redirectAttempt || 0;
    this.options.badStatusCodeAsError = typeof this.options.badStatusCodeAsError !== 'boolean';

    this.prepareRequestOptions();
  }

  private prepareRequestOptions() {
    this.requestOptions = {
      method: this.options.method,
      headers: this.options.headers || {},
      ...Url.parse(this.options.url)
    };

    if (this.options.json) {
      this.requestOptions.headers['Content-Type'] = 'application/json';
    }
  }

  private async prepareProtocol() {
    const { protocol } = this.requestOptions;
    if (protocol === 'https:') {
      this.protocol = https;
    } else {
      this.protocol = http;
    }
  }

  post<T>(data: IDictionary): Promise<IResponseData<T>> {
    const strData = JSON.stringify(data);
    this.requestOptions.headers['Content-Length'] = strData.length;
    this.requestOptions.method = 'POST';

    this.form = data;

    return this.send<T>(strData);
  }

  put<T>(data: IDictionary): Promise<IResponseData<T>> {
    const strData = JSON.stringify(data);
    this.requestOptions.headers['Content-Length'] = strData.length;
    this.requestOptions.method = 'PUT';

    this.form = data;

    return this.send<T>(strData);
  }

  get<T>(): Promise<IResponseData<T>> {
    return this.send();
  }


  async send<T>(data?: string): Promise<IResponseData<T>> {
    await this.prepareProtocol();

    return new Promise((resolve, reject) => {
      const req = this.protocol.request(this.requestOptions, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

        if (res.statusCode >= 400 && this.options.badStatusCodeAsError) {

          reject({ url: this.options.url, res, form: this.form });

          return;
        } else if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {

          resolve(this.redirectTo(res.headers.location));

          return;
        }

        let responseData = '';

        res.setEncoding('utf8');

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          let data = responseData as any;
          if (this.options.json) {
            try {
              data = JSON.parse(responseData) as T;
            } catch (e) {
            }
          }

          resolve({ data, res });
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      if (data) {
        req.write(data);
      }

      req.end();
    });
  }

  redirectTo<T>(href: string): Promise<IResponseData<T>> {
    const req = new Request({
      url: href,
      json: this.options.json,
      redirectAttempt: this.options.redirectAttempt + 1
    });

    if (this.requestOptions.method === 'POST') {
      return req.post(this.form);
    }

    return this.send();
  }
}
