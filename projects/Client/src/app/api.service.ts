import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subscribable } from 'rxjs';
import { ICocktail, IDrink, ILoginBody } from './models';

const apiUrls = {
  login: '',
  cocktails: '/api/cocktails',
  drinks: '/api/drinks',
  cookCocktail: '',
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

  // TODO
  cookCocktail(cocktail: ICocktail) {
    return this.httpClient.get(apiUrls.cookCocktail + '/' + cocktail.id);
  }

  getCocktails(): Observable<ICocktail[]> {
    const list = [];
    for (let i = 1; i < 10;i++) {
      list.push({
        id: i,
        name: `Cocktail ${i}`,
        components: [
          {
            id: 0,
            amount: Math.floor(Math.random() * 10),
            drink: {
              id: 0,
              name: 'Drink ' + 0,
            }
          },
          {
            id: i,
            amount: Math.floor(Math.random() * 10),
            drink: {
              id: i,
              name: 'Drink ' + i,
            }
          }
        ]
      });
    }
    return of(list);
    // return this.httpClient.get<ICocktail[]>(apiUrls.cocktails);
  }

  getCocktail(cocktailId: string) {
    return this.httpClient.get<ICocktail>(apiUrls.cocktails + '/' + cocktailId);
  }
  postCocktail(cocktail: ICocktail) {
    return this.httpClient.post<ICocktail>(apiUrls.cocktails, cocktail);
  }
  updateCocktail(cocktail: ICocktail) {
    return this.httpClient.put<ICocktail>(apiUrls.cocktails, cocktail);
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
    return this.httpClient.put<IDrink>(apiUrls.drinks, drink);
  }
  deleteDrink(drink: IDrink) {
    return this.httpClient.delete(apiUrls.cocktails + '/' + drink.id);
  }

}
