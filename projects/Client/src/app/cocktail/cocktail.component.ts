import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { ICocktail, IComponent, IDrink } from '../models';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.scss']
})
export class CocktailComponent implements OnInit {
  public id: string;
  public cocktail: ICocktail = {} as ICocktail;
  public drinks: IDrink[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private api: ApiService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    combineLatest([
      this.getCocktail(this.id),
      this.api.getDrinks()
    ]).subscribe(([cocktail, drinks]) => {
      this.drinks = drinks;
      cocktail.components = cocktail.components.map(el => {
        el.drink = drinks.find(d => d.id === el.drink.id);
        return el;
      });
      this.cocktail = cocktail;
    });
  }

  getCocktail(id: string): Observable<ICocktail> {
    if (id) {
      return this.api.getCocktail(id);
    } else {
      return of(this.cocktail);
    }
  }

  addDrink() {
    if (!this.cocktail.components) {
      this.cocktail.components = [];
    }
    this.cocktail.components.push({} as IComponent);
  }

  save() {
    console.log(this.cocktail);
    this.cocktail.components = this.cocktail.components.filter(el => {
      return el && el.drink && el.drink.id && el.amount
    });

    if (!this.cocktail.id) {
      this.api.postCocktail(this.cocktail)
        .subscribe(
          (data) => {
            this.toastr.success(`Cocktail ${this.cocktail.name} created`);
            this.location.back();
          },
          (err) => {
            this.toastr.error(err);
          }
        );
    } else {
      this.api.updateCocktail(this.cocktail)
        .subscribe(
          (data) => {
            this.toastr.success(`Cocktail ${this.cocktail.name} updated`);
            this.location.back();
          },
          (err) => {
            this.toastr.error(err);
          }
        );
    }
  }

  isCanUp(c: IComponent, index: number): boolean {
    return index !== 0;
  }

  isCanDown(c: IComponent, index: number): boolean {
    return index !== this.cocktail.components.length - 1;
  }

  up(c: IComponent, i: number) {
    let tmp = this.cocktail.components[i];
    this.cocktail.components[i] = this.cocktail.components[i-1];
    this.cocktail.components[i-1] = tmp;
  }

  down(c: IComponent, i: number) {
    let tmp = this.cocktail.components[i];
    this.cocktail.components[i] = this.cocktail.components[i+1];
    this.cocktail.components[i+1] = tmp;
  }

  delete(c: IComponent, i: number) {
    this.cocktail.components.splice(i, 1);
  }
}
