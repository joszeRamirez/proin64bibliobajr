import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatSlideToggleModule, LoginComponent, RegistroComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private router: Router) { }

  Login() {
    this.router.navigate(['/login']);
  }

  Registro() {
    this.router.navigate(['/registro']);
  }
}
