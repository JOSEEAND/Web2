import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './seguridad/login/login.component';
import { SharedComponent } from './shared/shared.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: SharedComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing = RouterModule.forRoot(routes);