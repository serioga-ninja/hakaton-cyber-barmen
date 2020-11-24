import { Gpio } from 'onoff';
import { BehaviorSubject } from 'rxjs';
import logger from '../Core/logger';
import { Pipe } from '../Database/entities/Pipe';

export enum DeviceState {
  WAITING_FOR_ORDER,
  PURRING_DRINKS,
  WAITING_FOR_TAKE_GLASS_TAKEN,
  WAITING_FOR_GLASS
}

export class Device {
  state: BehaviorSubject<DeviceState>;
  pipes: Gpio[];
  glassHolder: Gpio;

  constructor() {
    this.state = new BehaviorSubject<DeviceState>(DeviceState.WAITING_FOR_ORDER);
    this.pipes = [
      null,
      new Gpio(17, 'out'), //use GPIO pin 4 as output
      new Gpio(27, 'out'), //use GPIO pin 4 as output
      new Gpio(22, 'out'), //use GPIO pin 4 as output
      new Gpio(10, 'out'), //use GPIO pin 4 as output
      new Gpio(9, 'out'), //use GPIO pin 4 as output
      new Gpio(11, 'out'), //use GPIO pin 4 as output
    ];
    this.glassHolder = new Gpio(26, 'in', 'both');


    this.glassHolder.watch((err, value) => {
      if (err) {
        logger.error(err);

        return;
      }

      if (this.state.getValue() === DeviceState.WAITING_FOR_TAKE_GLASS_TAKEN) {
        this.state.next(DeviceState.WAITING_FOR_GLASS);
      } else {
        this.state.next(DeviceState.WAITING_FOR_ORDER);
      }
    });


    process.on('SIGINT', () => { //on ctrl+c

      for (let pipe of this.pipes) {
        if (!pipe) continue;

        pipe.writeSync(0); // Turn LED off
        pipe.unexport(); // Unexport LED GPIO to free resources
      }

      process.exit(); //exit completely
    });
  }

  activatePipe(pipe: Pipe) {
    const devicePipe = this.pipes[pipe.id];
    devicePipe.writeSync(1);
  }

  deactivatePipe(pipe: Pipe) {
    const devicePipe = this.pipes[pipe.id];
    devicePipe.writeSync(0);
  }

}
