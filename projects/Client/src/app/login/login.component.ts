import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ILoginBody } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public phase: string;

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login () {
    const loginBody: ILoginBody = {
      password: this.phase
    }
    this.api.login(loginBody).subscribe(data => {
      switch (this.phase) {
        case 'admin':
          this.router.navigateByUrl('admin');
          break;
        case 'user':
          this.router.navigateByUrl('cocktails');
          break;
        default:
          break;
      }
    });
  }
}
