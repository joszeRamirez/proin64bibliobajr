import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { BibliotecaComponent } from './pages/biblioteca/biblioteca.component';
import { EdituserComponent } from './pages/edituser/edituser.component';
import { CrealibroComponent } from './pages/crealibro/crealibro.component';
import { ListausuarioComponent } from './pages/listausuario/listausuario.component';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', title: 'Inicio', component: InicioComponent },
  { path: 'login', title: 'Inicio Sesión', component: LoginComponent },
  { path: 'registro', title: 'Registro', component: RegistroComponent },
  { path: 'biblioteca', title: 'Biblioteca', component: BibliotecaComponent },
  { path: 'listausuario', title: 'Lista usuarios', component: ListausuarioComponent },
  { path: 'crealibro', title: 'Crear libro', component: CrealibroComponent },
  { path: 'edituser', title: 'Editar usuario', component: EdituserComponent }

];