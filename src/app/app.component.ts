
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LibroService } from './services/libro.service';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proinbibliobajr';
  correo = 'asistencia@bibliobajr.com'
  obras = 0

  constructor(private router: Router,private libroService:LibroService){}

  //async getCantidadDatos() {
    //try {
      //const snapshot = await this.firestore.collection('libros').get().toPromise();
      // const cantidadDatos = snapshot.size;
      // console.log('Cantidad de datos:', cantidadDatos);
    //} catch (error) {
      //console.error('Error al obtener la cantidad de datos:', error);
    //}
  //}

  Login() {
    this.router.navigate(['/login']);
  }

  Registro() {
    this.router.navigate(['/registro']);
  }
}
