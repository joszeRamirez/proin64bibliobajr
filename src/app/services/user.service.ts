import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { User } from '../../domain/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore:Firestore) { }

  getUsers() {
    return getDocs(query(collection(this.firestore, 'usuarios')))
  }

  addUser(user: User) {
    addDoc(collection(this.firestore, 'usuarios'), Object.assign({}, user))
  }

  getUser(user: string){
    return user
  }

  deleteUser(user: User){

  }
}
