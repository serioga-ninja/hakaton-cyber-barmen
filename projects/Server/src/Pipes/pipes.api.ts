import { Api } from '../Core';
import { Pipe } from '../Database/entities/Pipe';

export class PipesApi extends Api {

  protected entity: typeof Pipe;

  constructor() {
    super({ baseUrl: 'pipes' });

    this.entity = Pipe;
  }

}
