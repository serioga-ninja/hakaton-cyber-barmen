import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CocktailComponent } from './cocktail/cocktail.component';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { ConfigComponent } from './config/config.component';
import { DrinkComponent } from './drink/drink.component';
import { DrinksComponent } from './drinks/drinks.component';
import { LoginComponent } from './login/login.component';

// TODO add guards
const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' }, // default route
  { path: 'login', component: LoginComponent },
  { path: 'cocktails', component: CocktailsComponent },
  {
    path: 'admin',
    component: AdminPageComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'drinks',
        component: DrinksComponent,
      },
      {
        path: 'drink/:id',
        component: DrinkComponent,
      },
      {
        path: 'drink',
        component: DrinkComponent,
      },
      {
        path: 'cocktails',
        component: CocktailsComponent,
      },
      {
        path: 'cocktail/:id',
        component: CocktailComponent,
      },
      {
        path: 'cocktail',
        component: CocktailComponent,
      },
      {
        path: 'config',
        component: ConfigComponent,
      },
    ],
  }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
