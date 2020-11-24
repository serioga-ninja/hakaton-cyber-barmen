import { Module } from '../Core';
import deviceLogic, { DeviceLogic } from './device.logic';

export class DeviceModule extends Module {
  deviceLogic: DeviceLogic;

  async register() {
    this.deviceLogic = deviceLogic;
    await this.deviceLogic.init();
  }
}
