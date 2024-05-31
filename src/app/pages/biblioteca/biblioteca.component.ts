import { Component } from '@angular/core';
import { Libro } from '../../../domain/libro';
import { LibroService } from '../../services/libro.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [FormsModule, HeaderComponent],
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.scss'
})
export class BibliotecaComponent {

  user: any
  libros: any[] = []
  buscateste: string = ''

  constructor(private router: Router, private libroService: LibroService) { }

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
