import { EventEmitter } from 'events';
import { Application, Request, Response } from 'express';
import { ServerStreamEvent } from './server-stream-events';

export interface IOptions{
    retry: number
}

export class CustomEventTypes {
    public static get SEND_DATA(): string {return 'sendData' }
    public static get END_STREAM(): string {return 'endStream' }
}

export const eventEmitterInstance = new EventEmitter();

export class ServerStream {
    private static instance: ServerStream = null;

    constructor(app: Application, options: IOptions) {
        this.initHeader(app, options);
    }

    public static getInstance(app: Application, options: IOptions): ServerStream {
        if(!ServerStream.instance) {
            ServerStream.instance = new ServerStream(app, options);
        }

        return ServerStream.instance
    }

    public initHeader(app: Application, options) {
        app.get('/stream', (request: Request, response: Response) => {
            response.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Origin': '*',
                Connection: 'keep-alive'
            });

            response.write(`retry: ${options.retry}\n`);
            response.flushHeaders();

            eventEmitterInstance.on(CustomEventTypes.SEND_DATA, (data: ServerStreamEvent) => {
                response.write('data: ' + data + '\n\n')
            });

            eventEmitterInstance.on(CustomEventTypes.END_STREAM, (data: any = 'End Stream') => {
                response.write('data:' + data + '\n\n');
                response.end()
            })
        })
    }
}
