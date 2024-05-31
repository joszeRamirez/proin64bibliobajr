import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '../../domain/user';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  constructor(private router: Router) { }

  user: User = new User();

  register() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.user.correo, this.user.passwo)
      .then((userCredential) => {

        // Registered
        const user = userCredential.user;
        console.log('Registration successful', user);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error during registration', errorCode, errorMessage);
      });
  }

  volver() {
    this.router.navigate(['/inicio']);
  }

  irLogin() {
    this.router.navigate(['/login']);
  }

  irRegistro() {
    this.router.navigate(['/registro']);
  }
}
