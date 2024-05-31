import { Component } from '@angular/core';
import { Libro } from '../../../domain/libro';
import { LibroService } from '../../services/libro.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.scss'
})
export class BibliotecaComponent {

  libros: any[] = []
  buscateste: string = ''

  constructor(private libroService: LibroService) { }

  ngOnInit() {
    this.libroService.getLibros().then(data => {

      this.libros = data.docs.map((doc: any) => {
        console.log(doc.id)
        console.log(doc.data())
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      console.log('libros', this.libros)
    })
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
