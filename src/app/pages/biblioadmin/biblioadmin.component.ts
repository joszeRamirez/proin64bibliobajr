import { Component, computed } from '@angular/core';
import { IconDelete } from '../../icons/delete';
import { IconEdit } from '../../icons/edit';
import { Libro } from '../../../domain/libro';
import { LibroService } from '../../services/libro.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-biblioadmin',
  standalone: true,
  imports: [IconDelete, IconEdit, ReactiveFormsModule, AsyncPipe, FormsModule, HeaderComponent],
  templateUrl: './biblioadmin.component.html',
  styleUrl: './biblioadmin.component.scss'
})
export class BiblioadminComponent {

  libros: any[] = []
  buscateste: string = ''

  constructor(private router: Router, private libroService: LibroService) {

  }

  ngOnInit() {
    this.libroService.getLibros().then(data => {

      this.libros = data.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      console.log('libros', this.libros)
    })

  }

  async deleteLibro(id: string) {
    try {
      this.libroService.deleteLibro(id);
      this.ngOnInit()
      console.log("se borró")
    } catch (error) {
      console.log("no se borró")
    }
  }

  volver() {
    this.router.navigate(['/biblioadmin']);
  }

  editLibro(libro: Libro) {
    this.router.navigate(['/editalibro', libro.id]);
  }

  async changeQuery() {
    console.log(this.buscateste)
    try {
      await this.libroService.searchLibroByQuery(this.buscateste).then(data => {

        this.libros = data.docs.map((doc: any) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })
        console.log('libros', this.libros)
      });
    } catch (error) {
      console.error(error)
    }
  }

}
