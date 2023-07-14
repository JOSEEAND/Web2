import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { SeguridadComponent } from '../seguridad.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router) { }

  login() {
    const hola = new AppComponent();
    const chao = new SeguridadComponent();
    chao.ingresar = true;
    hola.ingresar = true;
    this.router.navigate(['/main'] || ['/main1'] || ['/main2']);
  }
}