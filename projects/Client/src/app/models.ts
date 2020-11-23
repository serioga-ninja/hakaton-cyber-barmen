export enum UserRole {
  Guest,
  Admin,
  User,
}

export interface ILoginBody {
  password: string;
}

export interface IDrink {
  id: string;
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
