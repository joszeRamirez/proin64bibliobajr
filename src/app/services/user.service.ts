import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore) { }

<<<<<<< HEAD
  getUsers(): Observable<any[]> {
    const usersCollection = collection(this.firestore, 'usuarios');
    const q = query(usersCollection);
    return from(getDocs(q)).pipe(
      map(querySnapshot => {
        const users: any[] = [];
        querySnapshot.forEach(doc => {
          users.push({ id: doc.id, ...doc.data() });
        });
        return users;
      })
    );
=======
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

>>>>>>> 4321257d413047edb52cc5e90a4e7c71e56f6b09
  }
}
