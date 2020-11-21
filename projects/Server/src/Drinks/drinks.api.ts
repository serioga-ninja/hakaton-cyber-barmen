import { Api } from '../Core';
import { Drink } from '../Database/entities/Drink';

export class DrinksApi extends Api {
  entity: typeof Drink;

  constructor() {
    super({ baseUrl: 'drinks' });

    this.entity = Drink;
  }
}
