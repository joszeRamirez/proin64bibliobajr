import { Component } from '@angular/core';
import { Prestamo} from '../../../domain/prestamo';
import { OnInit } from '@angular/core';
import { Libro } from '../../../domain/libro';
import { LibroService } from '../../services/libro.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrestamoService } from '../../services/prestamo.service';


@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.scss'
})

export class PrestamoComponent implements OnInit {
  prestamos: Prestamo[] = [];
  libros: Libro[] = [];
  nuevoPrestamo: Prestamo = new Prestamo();

  constructor(
    private libroService: LibroService,
    private prestamoService: PrestamoService
  ) { }

  ngOnInit(): void {
    this.cargarPrestamos();
    this.cargarLibros();
  }

  cargarPrestamos() {
    this.prestamoService.getPrestamos().then(snapshot => {
      this.prestamos = snapshot.docs.map((doc: any) => {
        const data = doc.data();
        data.fechaPrestamo = data.fechaPrestamo.toDate(); // Convertir a objeto Date
        data.fechaDevolucion = data.fechaDevolucion ? data.fechaDevolucion.toDate() : undefined; // Convertir a objeto Date si existe
        return { id: doc.id, ...data } as Prestamo;
      });
    });
  }

  cargarLibros() {
    this.libroService.getLibros().then(snapshot => {
      this.libros = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as Libro));
    });
  }

  registrarPrestamo() {
    this.nuevoPrestamo.fechaPrestamo = new Date(this.nuevoPrestamo.fechaPrestamo); // Asegurar que sea Date
    this.prestamoService.addPrestamo(this.nuevoPrestamo).then(() => {
      this.cargarPrestamos();
      this.nuevoPrestamo = new Prestamo();
    });
  }

  devolverLibro(prestamo: Prestamo) {
    this.prestamoService.registrarDevolucion(prestamo.id).then(() => {
      this.cargarPrestamos();
    });
  }
}