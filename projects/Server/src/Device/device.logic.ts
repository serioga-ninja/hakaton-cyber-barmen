import { delay, filter, take } from 'rxjs/operators';
import logger from '../Core/logger';
import { EventTypes, ServerStreamEvent } from '../Notifications/server-stream-events';
import { Component } from '../Database/entities/Component';
import { Order } from '../Database/entities/Order';
import { Pipe } from '../Database/entities/Pipe';
import { dbConnection } from '../Database/ormconfig';
import notificationsConnector from '../Notifications/notifications.connector';
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
        await pipeRepo.save(pipe);

        if (pipe.capacityLeft <= 0) {
          notificationsConnector.notify(new ServerStreamEvent(EventTypes.BOTTLE_IS_EMPTY, pipe));
        }

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
        take(1),
        delay(2000)
      ).toPromise();

    notificationsConnector.notify(new ServerStreamEvent(EventTypes.START_NEW_ORDER, order));

    this.device.state.next(DeviceState.PURRING_DRINKS);

    await Promise.all(order.cocktail.components.map((component) => {
      return new PipeProcess(component, this.device).run();
    }));

    this.device.state.next(DeviceState.WAITING_FOR_TAKE_GLASS_TAKEN);
  }


  startPipe(index: number) {
    this.device.pipes[index].writeSync(1);
  }

  stopPipe(index: number) {
    this.device.pipes[index].writeSync(0);
  }
}

const deviceLogic = new DeviceLogic();
export default deviceLogic;
