import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ApiService } from './api.service';
import { SocketService } from './socket-service/socket.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { DrinksComponent } from './drinks/drinks.component';
import { DrinkComponent } from './drink/drink.component';
import { LogoComponent } from './logo/logo.component';
import { UserService } from './user.service';
import { CocktailComponent } from './cocktail/cocktail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CocktailsComponent,
    AdminPageComponent,
    DrinksComponent,
    DrinkComponent,
    LogoComponent,
    CocktailComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    ApiService,
    UserService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
