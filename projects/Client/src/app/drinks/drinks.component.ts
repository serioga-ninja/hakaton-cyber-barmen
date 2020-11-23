import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.api.getDrinks().subscribe(data => {
      this.drinks = data;
    });
  }

  create() {
    this.router.navigate(['../drink'],   {relativeTo: this.route});
  }

  update(drink: IDrink) {
    this.router.navigate(['../drink', drink.id],   {relativeTo: this.route});
  }
}
