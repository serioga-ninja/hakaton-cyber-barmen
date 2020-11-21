import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICocktail, ILoginBody } from './models';

const apiUrls = {
  login: '',
  getCocktails: '',
  selectCocktail: '',
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  login(data: ILoginBody) {
    console.log(data);
    return of('Success');
    // TODO
    // return this.httpClient.post(apiUrls.login, data);
  }

  getCocktails(): Observable<ICocktail[]> {
    const list = [];
    for (let i = 0; i < 10;i++) {
      list.push({
        id: i,
        name: `Cocktail ${i}`,
      });
    }
    return of(list);
    // return this.httpClient.post(apiUrls.getCocktails, data);
  }

  selectCocktail(cocktail: ICocktail) {
    return this.httpClient.post(apiUrls.selectCocktail, cocktail.id);
  }
}
