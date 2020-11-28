export enum EventTypes {
  ORDER_IS_READY = 1,
  API_SERVER_START,
  START_NEW_ORDER,
  BOTTLE_IS_EMPTY
}

export class ServerStreamEvent<T = any> {
  eventType: EventTypes;
  payload: T;

  constructor(eventType: EventTypes, payload?: T) {
    this.eventType = eventType;
    this.payload = payload;
  }
}
