import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ICocktail } from '../models';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.scss']
})
export class CocktailsComponent implements OnInit {
  public list: ICocktail[];

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.api.getCocktails()
      .subscribe((data) => {
        this.list = data;
      });
  }

  selectCocktail (item: ICocktail) {
    console.log(item);
    this.api.selectCocktail(item);
  }
}