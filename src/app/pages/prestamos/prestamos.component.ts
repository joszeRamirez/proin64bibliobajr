import { Component } from '@angular/core';
import { Prestamo} from '../../../domain/prestamo';
import { OnInit } from '@angular/core';
import { Libro } from '../../../domain/libro';
import { LibroService } from '../../services/libro.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrestamoService } from '../../services/prestamo.service';
import { AuthService } from '../../services/auth.service';


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
  usuarioActual: string = '';

  constructor(private libroService: LibroService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.usuarioActual = user.displayName || user.email || 'Usuario';
      }
    });

    this.cargarPrestamos();
    this.cargarLibros();
  }

  cargarPrestamos() {
    this.libroService.getPrestamos().then(snapshot => {
      this.prestamos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Prestamo));
    });
  }

  cargarLibros() {
    this.libroService.getLibros().then(snapshot => {
      this.libros = snapshot.docs.map(doc => {
        const libro = { id: doc.id, ...doc.data() } as Libro;
        if (!libro.estado) {
          libro.estado = 'disponible';
        }
        return libro;
      });
    });
  }

  registrarPrestamo() {
    this.nuevoPrestamo.usuarioId = this.usuarioActual;
    this.libroService.addPrestamo(this.nuevoPrestamo).then(() => {
      this.cargarPrestamos();
      this.cargarLibros();
    });
  }

  devolverLibro(prestamo: Prestamo) {
    this.libroService.registrarDevolucion(prestamo.id).then(() => {
      this.cargarPrestamos();
      this.cargarLibros();
    });
  }

  getLibroTitulo(libroId: string): string {
    const libro = this.libros.find(l => l.id === libroId);
    return libro ? libro.titulo : 'Desconocido';
  }
}