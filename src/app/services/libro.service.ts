import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Libro } from '../../domain/libro';

const PATH = 'libros';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private firestore: Firestore) { }

  getLibros() {
    return getDocs(query(collection(this.firestore, 'libros')))
  }

  addLibro(libro: Libro) {
    addDoc(collection(this.firestore, 'libros'), Object.assign({}, libro))
  }

  async getLibro(id: string) {
    try {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as Libro;
    } catch (error) {
      //catch error
      return undefined;
    }
  }

  async searchLibroByQuery(name: string) {
    return getDocs(query(
      collection(this.firestore, 'libros'),
      where('titulo', ">=", name),
      where('titulo', "<=", name + '\uf8ff'),
    ));
  }

  updateLibro(id: string, libro: Libro) {
    return updateDoc(this.document(id), { ...libro });
  }

  deleteLibro(id: string) {
    return deleteDoc(this.document(id));
  }

  private document(id: string) {
    return doc(this.firestore, `${PATH}/${id}`);
  }
}
