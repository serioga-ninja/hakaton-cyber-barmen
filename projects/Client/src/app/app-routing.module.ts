import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { DrinkComponent } from './drink/drink.component';
import { DrinksComponent } from './drinks/drinks.component';
import { LoginComponent } from './login/login.component'; // CLI imports router

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' }, // default route
  { path: 'login', component: LoginComponent },
  { path: 'cocktails', component: CocktailsComponent },
  {
    path: 'admin',
    component: AdminPageComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'drinks', // child route path
        component: DrinksComponent,
      },
      {
        path: 'drink', // child route path
        component: DrinkComponent,
      },
      {
        path: 'drink/:id', // child route path
        component: DrinkComponent,
      },
      /*{
        path: 'cocktails',
        component: CocktailsBComponent,
      },*/
    ],
  }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
