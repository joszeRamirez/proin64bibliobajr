import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IconRocket } from '../../icons/rocket';
import { Libro } from '../../../domain/libro';
import { LibroService } from '../../services/libro.service';
import { HeaderComponent } from '../../header/header.component';

export interface CreateForm {
  portada: FormControl<string>;
  titulo: FormControl<string>;
  autores: FormControl<string>;
  editorial: FormControl<string>;
  estado: FormControl<'disponible' | 'prestado' | 'reservado'>; //new variable 
  anioedito: FormControl<number>;
  numpags: FormControl<number>;
  idioma: FormControl<string>;
  resumen: FormControl<string>;
}

@Component({
  selector: 'app-crealibro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, IconRocket, HeaderComponent],
  templateUrl: './crealibro.component.html',
  styleUrl: './crealibro.component.scss'
})
export class CrealibroComponent {

  private elibroId = ''

  constructor(private router: Router, private libroService: LibroService, private formBuilder: NonNullableFormBuilder) { }

  get libroId(): string {
    return this.elibroId;
  }

  @Input() set libroId(value: string) {
    this.elibroId = value;
    this.setFormValues(this.elibroId);
  }

  form = this.formBuilder.group<CreateForm>({
    portada: this.formBuilder.control('', Validators.required),
    titulo: this.formBuilder.control('', Validators.required),
    autores: this.formBuilder.control('', Validators.required),
    editorial: this.formBuilder.control('', Validators.required),
    estado: this.formBuilder.control<'disponible' | 'prestado' | 'reservado'>('disponible', Validators.required),
    anioedito: this.formBuilder.control(0, Validators.min(4)),
    numpags: this.formBuilder.control(0, Validators.min(1)),
    idioma: this.formBuilder.control('', Validators.required),
    resumen: this.formBuilder.control(''),
  });
  retroceder() {
    this.router.navigate(['/biblioadmin']);
  }
  
  volver() {
    this.router.navigate(['/biblioteca']);
  }
  
  async crearLibro() {
    if (this.form.invalid) return;

    try {
      const libro = this.form.value as Libro;
      !this.libroId
        ? this.libroService.addLibro(libro)
        : this.libroService.updateLibro(this.libroId, libro);
      this.router.navigate(['/biblioadmin']);
    } catch (error) {
      // call some toast service to handle the error
    }
  }

  async setFormValues(id: string) {
    try {
      const libro = await this.libroService.getLibro(id);
      if (!libro) return;
      this.form.setValue({
        portada: libro.portada,
        titulo: libro.titulo,
        autores: libro.autores,
        editorial: libro.editorial,
        estado: libro.estado,
        anioedito: libro.anioedito,
        numpags: libro.numpags,
        idioma: libro.idioma,
        resumen: libro.resumen
      });
    } catch (error) { }
  }
}
