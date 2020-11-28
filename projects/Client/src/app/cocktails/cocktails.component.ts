import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { ICocktail } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.scss']
})
export class CocktailsComponent implements OnInit {
  public list: ICocktail[];

  get isAdmin() {
    return this.userService.isAdmin;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private toast: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.api.getCocktails()
      .subscribe((data) => {
        this.list = data;
      });
  }

  selectCocktail(item: ICocktail) {
    this.api.cookCocktail(item).subscribe(data => {
      this.toast.success(`Cocktail ${item.name} selected for cooking`);
    });
  }

  /*
  * Admin
  *  */
  newCocktail(event: MouseEvent) {
    event.stopImmediatePropagation();
    this.router.navigate([`../cocktail`],   {relativeTo: this.route});
  }

  editCocktail(event: MouseEvent, item: ICocktail) {
    event.stopImmediatePropagation();
    this.router.navigate([`../cocktail`, item.id],   {relativeTo: this.route});
  }

  deleteCocktail(event: MouseEvent, item: ICocktail) {
    event.stopImmediatePropagation();
    this.api.deleteCocktail(item).subscribe(el => {
      this.toast.success(`Cocktail ${item.name} successfully deleted`)
    });
  }
}
