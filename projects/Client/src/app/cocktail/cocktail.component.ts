import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    if (this.id) {
      this.api.getCocktail(this.id).subscribe(data => {
        this.cocktail = data;
      });
    }

    this.api.getDrinks().subscribe(data => {
      this.drinks = data;
    });
  }

  addDrink() {
    if (!this.cocktail.components) {
      this.cocktail.components = [];
    }
    this.cocktail.components.push({} as IComponent);
  }

  save() {
    console.log(this.cocktail);
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
}
