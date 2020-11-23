import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { ILoginBody, UserRole } from './models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // TODO Guest
  public role: UserRole = UserRole.Admin;

  get isAdmin(): boolean {
    return this.role === UserRole.Admin;
  }

  constructor(
    private api: ApiService,
    private router: Router,
  ) { }

  doLogin(data: ILoginBody) {
    // TODO
    let observable = this.api.login(data);
    observable.subscribe(res => {
      switch (data.password) {
        case 'admin':
          this.role = UserRole.Admin;
          this.router.navigateByUrl('admin');
          break;
        case 'user':
          this.role = UserRole.User;
          this.router.navigateByUrl('cocktails');
          break;
        default:
          break;
      }
    });
    console.log(this.role);
    return observable
  }

}
