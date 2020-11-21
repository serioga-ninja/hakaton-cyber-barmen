import { Api } from '../Core';
import { Cocktail } from '../Database/entities/Cocktail';

export class CocktailsApi extends Api {
  entity: typeof Cocktail;

  constructor() {
    super({ baseUrl: 'cocktails' });

    this.entity = Cocktail;
  }
}
