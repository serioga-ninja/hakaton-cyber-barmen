import { Api } from '../Core';
import { IGetManyRequest, IResponse } from '../Core/interfaces';
import { dbConnection } from '../Database/connections';
import { Cocktail } from '../Database/entities/Cocktail';

export class CocktailsApi extends Api {
  entity: typeof Cocktail;

  constructor() {
    super({ baseUrl: 'cocktails' });

    this.entity = Cocktail;
  }

  protected async getMany(request: IGetManyRequest, response: IResponse): Promise<void> {
    const res = await dbConnection
      .getRepository(this.entity)
      .find({
        relations: ['components', 'components.drink']
      })
    ;

    response.json(res);
  }
}
