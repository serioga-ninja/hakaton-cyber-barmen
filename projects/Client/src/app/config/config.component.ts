import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IConfigPipe, IDrink } from '../models';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  public items: IConfigPipe[] = [];
  public drinks: IDrink[];

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    for (let i = 0; i < 6; i++) {
      this.items.push(
        {
          drinkId: '',
          id: i
        });
    }

    console.log(this.items);
    this.api.getConfig().subscribe(data => {
      if (data && data.length) {
        this.items = data;
      }
    });

    this.api.getDrinks().subscribe(data => {
      this.drinks = data;
    });
  }

  save() {
    console.log(this.items);
    this.api.setConfig(this.items);
  }
}
