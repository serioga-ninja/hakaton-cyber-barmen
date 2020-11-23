import { Gpio } from 'onoff';

export enum DeviceState {
  WAITING
}

export enum DEVICE_COMMANDS {

}

export class Device {
  state: DeviceState;
  led: Gpio;
  button: Gpio;

  constructor() {
    // this.led = new Gpio(17, 'out');
    // this.button = new Gpio(4, 'in', 'both');
  }

  runCommand() {

  }


}
