import { Gpio } from 'onoff';
import { BehaviorSubject } from 'rxjs';
import logger from '../Core/logger';
import { Pipe } from '../Database/entities/Pipe';

export enum DeviceState {
  WAITING
}

export class Device {
  state: BehaviorSubject<DeviceState>;
  pipes: Gpio[];

  constructor() {
    this.state = new BehaviorSubject<DeviceState>(DeviceState.WAITING);
    this.pipes = [
      null,
      new Gpio(17, 'out'), //use GPIO pin 4 as output
      new Gpio(27, 'out'), //use GPIO pin 4 as output
      new Gpio(22, 'out'), //use GPIO pin 4 as output
      new Gpio(10, 'out'), //use GPIO pin 4 as output
      new Gpio(9, 'out'), //use GPIO pin 4 as output
      new Gpio(11, 'out'), //use GPIO pin 4 as output
    ];


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
