import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.api.getDrinks().subscribe(data => {
      this.drinks = data;
    });
  }

  create() {
    this.router.navigateByUrl('admin/drink');
  }

  update(drink: IDrink) {
    console.log(drink);
    this.router.navigate(['admin', 'drink', drink.id]);
  }
}
