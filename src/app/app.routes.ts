import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { BibliotecaComponent } from './pages/biblioteca/biblioteca.component';
import { EdituserComponent } from './pages/edituser/edituser.component';
import { CrealibroComponent } from './pages/crealibro/crealibro.component';
import { listausuario } from './pages/listausuario/listausuario.component';
import { InicioComponent } from './inicio/inicio.component';
import { BiblioadminComponent } from './pages/biblioadmin/biblioadmin.component';
import { EditusadminComponent } from './pages/editusadmin/editusadmin.component';
import { PrestamoComponent } from './pages/prestamos/prestamos.component';


export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', title: 'Inicio', component: InicioComponent },
  { path: 'login', title: 'Inicio Sesión', component: LoginComponent },
  { path: 'registro', title: 'Registro', component: RegistroComponent },
  { path: 'biblioteca', title: 'Biblioteca', component: BibliotecaComponent },
  { path: 'biblioadmin', title: 'Administrar Libros', component: BiblioadminComponent },
  { path: 'listausuario', title: 'Lista usuarios', component: listausuario },
  { path: 'crealibro', title: 'Crear libro', component: CrealibroComponent },
  { path: 'editalibro/:libroId', title: 'Editar libro', component: CrealibroComponent },
  { path: 'edituser/:userId', title: 'Editar usuario', component: EdituserComponent },
  { path: 'edituseradmin/:userId', title: 'Editar usuario', component: EditusadminComponent },
  { path: 'prestamos', title: 'Gestión de Préstamos', component: PrestamoComponent }
];