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
  drink?: IDrink,
  capacity: number,
  capacityLeft: number,
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
