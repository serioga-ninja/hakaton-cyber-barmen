import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { LoginComponent } from './login/login.component'; // CLI imports router

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' }, // default route
  { path: 'login', component: LoginComponent },
  { path: 'cocktails', component: CocktailsComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
