import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { ICocktail, IConfigPipe, IDrink, ILoginBody } from './models';

const baseAPI = environment.baseAPI ? environment.baseAPI : 'http://localhost:3000/api/';

const apiUrls = {
  login: '',
  config: `${baseAPI}config`,
  cocktails: `${baseAPI}cocktails`,
  drinks: `${baseAPI}drinks`,
  cookCocktail: `${baseAPI}orders`,
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

  cookCocktail(cocktail: ICocktail) {
    return this.httpClient.post(apiUrls.cookCocktail, {cocktailId: cocktail.id});
  }

  getConfig() {
    return this.httpClient.get<IConfigPipe[]>(apiUrls.config);
  }
  setConfig(body: IConfigPipe[]) {
    return this.httpClient.put<IConfigPipe[]>(apiUrls.config, body);
  }

  getCocktails(): Observable<ICocktail[]> {
    return this.httpClient.get<ICocktail[]>(apiUrls.cocktails);
  }

  getCocktail(cocktailId: string) {
    return this.httpClient.get<ICocktail>(apiUrls.cocktails + '/' + cocktailId);
  }
  postCocktail(cocktail: ICocktail) {
    return this.httpClient.post<ICocktail>(apiUrls.cocktails, cocktail);
  }
  updateCocktail(cocktail: ICocktail) {
    return this.httpClient.put<ICocktail>(apiUrls.cocktails + '/' + cocktail.id, cocktail);
  }
  deleteCocktail(cocktail: ICocktail) {
    return this.httpClient.delete(apiUrls.cocktails + '/' + cocktail.id);
  }

  getDrinks() {
    return this.httpClient.get<IDrink[]>(apiUrls.drinks);
  }
  getDrink(drinkId: string) {
    return this.httpClient.get<IDrink>(apiUrls.drinks + '/' + drinkId);
  }
  postDrink(drink: IDrink) {
    return this.httpClient.post<IDrink>(apiUrls.drinks, drink);
  }
  updateDrink(drink: IDrink) {
    return this.httpClient.put<IDrink>(apiUrls.drinks + '/' + drink.id, drink);
  }
  deleteDrink(drink: IDrink) {
    return this.httpClient.delete(apiUrls.drinks + '/' + drink.id);
  }

}
