import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '../../domain/user';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  constructor(private router: Router, public authService: AuthService) {}

  user: User = new User();

  register() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.user.correo, this.user.passwo)
      .then((userCredential) => {

        const user = userCredential.user;
        console.log('Registro Completado', user);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error, intente de nuevo', errorCode, errorMessage);
      });
  }

  
}
