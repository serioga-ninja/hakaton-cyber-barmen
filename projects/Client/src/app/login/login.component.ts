import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ILoginBody } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public phase: string;

  constructor(
    private api: ApiService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  login () {
    const loginBody: ILoginBody = {
      password: this.phase
    }

    this.userService.doLogin(loginBody);
  }
}
