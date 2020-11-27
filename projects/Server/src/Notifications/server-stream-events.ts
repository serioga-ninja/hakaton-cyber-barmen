export enum EventTypes {
  ORDER_IS_READY = 1,
  API_SERSVER_START,
  START_NEW_ORDER
}

export class ServerStreamEvent<T = any> {
  eventType: EventTypes;
  payload: T;

  constructor(eventType: EventTypes, payload?: T) {
    this.eventType = eventType;
    this.payload = payload;
  }
}
