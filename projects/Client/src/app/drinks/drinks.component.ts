import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IDrink } from '../models';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {
  public drinks: IDrink[];

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.api.getDrinks().subscribe(data => {
      this.drinks = data;
    });
  }

  create() {

  }

  update(drink: IDrink) {
    console.log(drink);
  }
}
