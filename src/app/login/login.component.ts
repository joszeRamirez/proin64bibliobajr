import { User } from './../../domain/user';
import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user: User = new User()

  constructor(private router: Router, private userService: UserService) { }

  login(username: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Inicio de sesión exitoso', user);
        this.router.navigate(['/biblioteca']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error de inicio de sesión', errorCode, errorMessage);
      });

    // this.user = this.userService.getUser(username)
    if (this.user.isadmin) {
      this.router.navigate(['/bibliotecadmin']);
    } else {
      this.router.navigate(['/biblioteca']);
    }
  }
}
