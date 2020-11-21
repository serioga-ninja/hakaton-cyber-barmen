import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { IDrink } from '../models';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit {
  public id: string;
  public drink: IDrink = {} as IDrink;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];

      if (this.id) {
        this.api.getDrink(this.id).subscribe(data => {
          this.drink = data;
        });
      }
    });
  }

  save() {
    if (!this.drink.id) {
      this.api.postDrink(this.drink);
    } else {
      this.api.updateDrink(this.drink);
    }
  }

}
