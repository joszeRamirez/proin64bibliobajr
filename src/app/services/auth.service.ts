import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  register(email: string, password: string) {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  login(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  logout() {
    return from(this.afAuth.signOut());
  }


}

