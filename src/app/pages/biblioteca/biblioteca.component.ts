import { Component } from '@angular/core';
import { Libro } from '../../../domain/libro';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [],
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.scss'
})
export class BibliotecaComponent {

  libro: Libro = new Libro()

  libros: any

  constructor(private libroService: LibroService) { }

  // ngOnInit() {
  //   this.libroService.getLibros().then(data => {

  //     this.libros = data.docs.map((doc: any) => {
  //       console.log(doc.id)
  //       console.log(doc.data())
  //       return {
  //         id: doc.id,
  //         ...doc.data()
  //       }
  //     })

  //     console.log('libros', this.libros)
  //   })
  // }

  // cargarLibro(titulo: string) {
  //   // this.libroService.getLibro(titulo).subscribe(data => {
  //   //   this.libro = data
  //   // })
  // }

  // guardar() {

  //   this.libroService.addLibro(this.libro)
  //   this.ngOnInit()
  // }
}
