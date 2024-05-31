import { Router } from '@angular/router';
import { LibroService } from './../services/libro.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit{
  correo = 'asistencia@bibliobajr.com'
  obras = 0
  libros: any[] = []
  constructor(private router: Router,private libroService: LibroService) { }

  ngOnInit(): void {
    this.libroService.getLibros().then(data => {

      this.libros = data.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
    })
  }
  volver() {
    this.router.navigate(['/inicio']);
  }

  irLogin() {
    this.router.navigate(['/login']);
  }

  irRegistro() {
    this.router.navigate(['/registro']);
  }
}
