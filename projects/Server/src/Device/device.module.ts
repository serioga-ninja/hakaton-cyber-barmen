import { Module } from '../Core';
import deviceLogic, { DeviceLogic } from './device.logic';

export class DeviceModule extends Module {
  deviceLogic: DeviceLogic;

  register() {
    this.deviceLogic = deviceLogic;
  }
}
