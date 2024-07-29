import { Component } from '@angular/core';
import { Libro } from '../../../domain/libro';
import { LibroService } from '../../services/libro.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [FormsModule, HeaderComponent, CommonModule],
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.scss'
})
export class BibliotecaComponent implements OnInit {
  user: any;
  libros: any[] = [];
  librosFiltrados: any[] = [];
  buscaTitulo: string = '';
  buscaAutor: string = '';
  filtroCategoria: string = '';
  filtroDisponibilidad: string = '';
  categorias: string[] = ['Drama', 'Terror', 'Acción', 'Autoayuda', 'Tecnología', 'Ciencia ficción'];

  constructor(private router: Router, private libroService: LibroService) { }

  ngOnInit() {
    this.loadLibros();
  }

  async loadLibros() {
    try {
      const data = await this.libroService.getLibros();
      this.libros = data.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }));
      this.librosFiltrados = [...this.libros];
    } catch (error) {
      console.error(error);
    }
  }

  filterLibros() {
    this.librosFiltrados = this.libros.filter(libro => {
      const tituloCoincide = this.buscaTitulo ? libro.titulo.toLowerCase().includes(this.buscaTitulo.toLowerCase()) : true;
      const autorCoincide = this.buscaAutor ? libro.autores.toLowerCase().includes(this.buscaAutor.toLowerCase()) : true;
      const categoriaCoincide = this.filtroCategoria ? libro.categoria === this.filtroCategoria : true;
      const disponibilidadCoincide = this.filtroDisponibilidad ? libro.estado === this.filtroDisponibilidad : true;

      return tituloCoincide && autorCoincide && categoriaCoincide && disponibilidadCoincide;
    });
  }

  clearFilters() {
    this.buscaTitulo = '';
    this.buscaAutor = '';
    this.filtroCategoria = '';
    this.filtroDisponibilidad = '';
    this.librosFiltrados = [...this.libros];
  }

  changeQuery() {
    this.filterLibros();
  }

  volver() {
    this.router.navigate(['/biblioteca']);
  }

  irLogin() {
    this.router.navigate(['/login']);
  }

  irRegistro() {
    this.router.navigate(['/registro']);
  }
}