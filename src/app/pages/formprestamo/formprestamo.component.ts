import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Prestamo } from '../../../domain/prestamo';
import { PrestamoService } from '../../services/prestamo.service';

@Component({
  selector: 'app-formprestamo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formprestamo.component.html',
  styleUrl: './formprestamo.component.scss'
})
export class FormPrestamoComponent implements OnInit {
  @Input() prestamo: Prestamo | null = null;
  @Output() cerrar = new EventEmitter<void>();

  form: FormGroup = this.fb.group({
    libroId: ['', Validators.required],
    userId: ['', Validators.required],
    fechaPrestamo: ['', Validators.required],
    fechaDevolucion: ['', Validators.required],
    estado: ['prestado', Validators.required]
  });

  constructor(private fb: FormBuilder, private prestamoService: PrestamoService) {}

  ngOnInit() {
    if (this.prestamo) {
      this.form.patchValue(this.prestamo);
    }
  }

  submit() {
    if (this.form.valid) {
      const prestamo: Prestamo = this.form.value;
      if (this.prestamo?.id) {
        // Actualizar préstamo existente
        this.prestamoService.updatePrestamo(this.prestamo.id, prestamo).subscribe(() => {
          this.cerrar.emit();
        });
      } else {
        // Agregar nuevo préstamo
        this.prestamoService.addPrestamo(prestamo).subscribe(() => {
          this.cerrar.emit();
        });
      }
    }
  }

  cancelar() {
    this.cerrar.emit();
  }
}