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

  constructor(private libroService: LibroService) { }

  ngOnInit(): void {
    
  }
}
