import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IDrink } from '../models';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  public items: string[] = new Array(4);;
  public drinks: IDrink[];

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.api.getDrinks().subscribe(data => {
      this.drinks = data;
    });
  }

  save() {

  }

}
