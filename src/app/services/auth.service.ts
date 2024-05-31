import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';

import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: Auth) { }

  // register(email: string, password: string) {
  //   return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  // }

  // login(email: string, password: string) {
  //   return from(this.afAuth.signInWithEmailAndPassword(email, password));
  // }

  logout() {
    return from(this.afAuth.signOut());
  }


}

