import { Api } from '../Core';

export class CocktailsApi extends Api {
  entity: typeof CocktailsApi;

  constructor() {
    super({ baseUrl: 'cocktails' });

    this.entity = CocktailsApi;
  }
}
