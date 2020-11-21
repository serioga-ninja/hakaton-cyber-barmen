
export interface ILoginBody {
  password: string;
}

export interface IDrink {
  id: string;
  name: string;
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
