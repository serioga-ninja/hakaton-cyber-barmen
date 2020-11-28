export enum UserRole {
  Guest,
  Admin,
  User,
}

export interface ILoginBody {
  password: string;
}

export interface IConfigPipe {
  id: number,
  drinkId?: string | number | null,
}

export interface IDrink {
  id: string | number;
  name: string;
  capacity: number;
}

export interface ICocktail {
  id: string;
  name: string;
  components: IComponent[]
}

export interface IComponent {
  id: string;
  amount: number;
  drink: IDrink;
}

export interface IEventStream {
  eventType: EventTypes,
  payload: {}
}

export enum EventTypes {
  ORDER_IS_READY = 1,
  API_SERVER_START,
  START_NEW_ORDER,
  BOTTLE_IS_EMPTY
}

export const EventNotifications = {
  [EventTypes.ORDER_IS_READY]: 'Order is Ready',
  [EventTypes.API_SERVER_START]: 'Session is started',
  [EventTypes.START_NEW_ORDER]: 'Your order has started',
  [EventTypes.BOTTLE_IS_EMPTY]: 'Bottle is empty',
};

