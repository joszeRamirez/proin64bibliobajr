import { Component, Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  usuario: string = ''

  constructor(private router: Router) { }

  abrirPanel() { }

  pasarNeim(name: string) {
    this.usuario = name;
  }

  irListaUser() {
    this.router.navigate(['/listausuario']);
  }

  irBibliAdmin() {
    this.router.navigate(['/biblioadmin']);
  }

}
