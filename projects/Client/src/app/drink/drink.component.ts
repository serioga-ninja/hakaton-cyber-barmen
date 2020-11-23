import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.api.getDrink(this.id).subscribe(data => {
        this.drink = data;
      });
    }
  }

  save() {
    if (!this.drink.id) {
      this.api.postDrink(this.drink)
        .subscribe(
          (data) => {
            this.toastr.success(`Drink ${this.drink.name} created`);
          },
          (err) => {
            this.toastr.error(err);
          }
        );
    } else {
      this.api.updateDrink(this.drink)
        .subscribe(
          (data) => {
            this.toastr.success(`Drink ${this.drink.name} updated`);
          },
          (err) => {
            this.toastr.error(err);
          }
        );
    }
  }
}
