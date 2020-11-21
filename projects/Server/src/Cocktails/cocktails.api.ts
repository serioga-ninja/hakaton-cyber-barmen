import { Api } from '../Core';
import { Drink } from '../Database/entities/Drink';

export class CocktailsApi extends Api {
  entity: typeof CocktailsApi;

  constructor() {
    super({ baseUrl: 'cocktails' });

    this.entity = CocktailsApi;
  }
}
