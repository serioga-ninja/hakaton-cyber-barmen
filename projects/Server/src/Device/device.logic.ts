import { Order } from '../Database/entities/Order';
import { Device } from './device';
import { DeviceCommands } from './device.commands';


export class DeviceLogic {

  private deviceCommands: DeviceCommands;
  private readonly device: Device;

  constructor() {
    this.device = new Device();
    this.deviceCommands = new DeviceCommands(this.device);
  }

  prepareOrder(order: Order) {

  }
}

const deviceLogic = new DeviceLogic();
export default deviceLogic;
