import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './seguridad/login/login.component';
import { AppComponent } from './app.component';
import { SeguridadComponent } from './seguridad/seguridad.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: SeguridadComponent },
  { path: '', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing = RouterModule.forRoot(routes);
