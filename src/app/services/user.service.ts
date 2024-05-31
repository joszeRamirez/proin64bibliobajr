import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query } from '@angular/fire/firestore';
import { User } from '../../domain/user';
import { addDoc, deleteDoc, doc, getDoc, updateDoc, where } from 'firebase/firestore';

const PATH = 'usuarios';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore) { }

  getUsers() {
    return getDocs(query(collection(this.firestore, 'usuarios')))
  }

  addUser(user: User) {
    addDoc(collection(this.firestore, 'usuarios'), Object.assign({}, user))
  }

  async getUser(id: string) {
    try {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as User;
    } catch (error) {
      //catch error
      return undefined;
    }
  }

  async searchUserUnico(name: string) {
    return getDocs(query(
      collection(this.firestore, 'usuarios'),
      where('correo', ">=", name),
      where('correo', "<=", name + '\uf8ff'),
    ));
  }

  async searchUserByQuery(name: string) {
    return getDocs(query(
      collection(this.firestore, 'usuarios'),
      where('user', ">=", name),
      where('user', "<=", name + '\uf8ff'),
    ));
  }

  updateUser(id: string, user: User) {
    return updateDoc(this.document(id), { ...user });
  }


  private document(id: string) {
    return doc(this.firestore, `${PATH}/${id}`);
  }
}
