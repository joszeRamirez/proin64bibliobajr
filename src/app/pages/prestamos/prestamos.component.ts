import { Component } from '@angular/core';
import { Prestamo} from '../../../domain/prestamo';
import { OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { PrestamoService } from '../../services/prestamo.service';
import { FormPrestamoComponent } from '../formprestamo/formprestamo.component';


@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [NgFor, CommonModule, FormPrestamoComponent],
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.scss'
})

export class PrestamosComponent implements OnInit {

  prestamos: Prestamo[] = [];
  mostrarFormulario: boolean = false;
  prestamoSeleccionado: Prestamo | null = null;

  constructor(private prestamoService: PrestamoService) { }

  ngOnInit() {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    this.prestamoService.getPrestamos().subscribe(data => {
      this.prestamos = data;
    });
  }

  abrirFormulario() {
    this.prestamoSeleccionado = null;
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.cargarPrestamos();
  }

  devolverLibro(id: string) {
    const prestamo = this.prestamos.find(p => p.id === id);
    if (prestamo) {
      prestamo.estado = 'devuelto';
      this.prestamoService.updatePrestamo(id, prestamo).subscribe(() => {
        this.cargarPrestamos();
      });
    }
  }

  editarPrestamo(id: string) {
    this.prestamoSeleccionado = this.prestamos.find(p => p.id === id) || null;
    this.mostrarFormulario = true;
  }

  eliminarPrestamo(id: string) {
    this.prestamoService.deletePrestamo(id).subscribe(() => {
      this.cargarPrestamos();
    });
  }
}


