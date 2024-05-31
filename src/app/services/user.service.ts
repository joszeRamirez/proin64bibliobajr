import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore) { }

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
  }
}
