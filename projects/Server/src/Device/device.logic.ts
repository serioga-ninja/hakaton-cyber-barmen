import { filter, take } from 'rxjs/operators';
import logger from '../Core/logger';
import { EventTypes, ServerStreamEvent } from '../Core/server-stream-events';
import { CustomEventTypes, eventEmitterInstance } from '../Core/server.stream';
import { Component } from '../Database/entities/Component';
import { Order } from '../Database/entities/Order';
import { Pipe } from '../Database/entities/Pipe';
import { dbConnection } from '../Database/ormconfig';
import { Device, DeviceState } from './device';

class PipeProcess {
  private readonly timeToPour: number;

  constructor(private component: Component, private device: Device) {
    this.timeToPour = (component.amount / component.drink.capacity) * 1000;
  }

  run() {
    return new Promise<void>(async (resolve) => {
      const pipeRepo = dbConnection.getRepository(Pipe);
      const pipe = await pipeRepo.findOne({ where: { drinkId: this.component.drink.id } });

      logger.info(`Activating pipe for ${this.timeToPour} ms`, pipe);
      this.device.activatePipe(pipe);

      setTimeout(async () => {
        this.device.deactivatePipe(pipe);

        pipe.capacityLeft -= this.component.amount;
        await pipeRepo
          .save(pipe);
        
        resolve();
      }, this.timeToPour);
    });
  }
}

export class DeviceLogic {

  private readonly device: Device;

  constructor() {
    this.device = new Device();
  }

  async prepareOrder(order: Order) {
    await this.device.state
      .pipe(
        filter((state) => state === DeviceState.WAITING_FOR_ORDER),
        take(1)
      ).toPromise();

    eventEmitterInstance.emit(CustomEventTypes.SEND_DATA, new ServerStreamEvent(EventTypes.START_NEW_ORDER, order));
    this.device.state.next(DeviceState.PURRING_DRINKS);

    await Promise.all(order.cocktail.components.map((component) => {
      return new PipeProcess(component, this.device).run();
    }));

    this.device.state.next(DeviceState.WAITING_FOR_TAKE_GLASS_TAKEN);
  }
}

const deviceLogic = new DeviceLogic();
export default deviceLogic;
