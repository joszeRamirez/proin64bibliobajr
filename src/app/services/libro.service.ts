import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Libro } from '../../domain/libro';
import { Prestamo } from '../../domain/prestamo';

const PATH = 'libros';
const PATH_LIBROS = 'libros';
const PATH_PRESTAMOS = 'prestamos';

@Injectable({
  providedIn: 'root'
})

export class LibroService {

  constructor(private firestore: Firestore) { }

  getLibros() {
    return getDocs(query(collection(this.firestore, PATH_LIBROS)));
  }

  addLibro(libro: Libro) {
    return addDoc(collection(this.firestore, PATH_LIBROS), Object.assign({}, libro));
  }

  async getLibro(id: string) {
    try {
      const snapshot = await getDoc(this.document(id, PATH_LIBROS));
      return snapshot.data() as Libro;
    } catch (error) {
      //catch error
      return undefined;
    }
  }

  async searchLibroByQuery(name: string) {
    return getDocs(query(
      collection(this.firestore, PATH_LIBROS),
      where('titulo', ">=", name),
      where('titulo', "<=", name + '\uf8ff'),
    ));
  }

  updateLibro(id: string, libro: Libro) {
    return updateDoc(this.document(id, PATH_LIBROS), { ...libro });
  }

  deleteLibro(id: string) {
    return deleteDoc(this.document(id, PATH_LIBROS));
  }

  private document(id: string, path: string) {
    return doc(this.firestore, `${path}/${id}`);
  }

  getPrestamos() {
    return getDocs(query(collection(this.firestore, PATH_PRESTAMOS)));
  }

  addPrestamo(prestamo: Prestamo) {
    return addDoc(collection(this.firestore, PATH_PRESTAMOS), Object.assign({}, prestamo));
  }

  registrarDevolucion(id: string) {
    return updateDoc(this.document(id, PATH_PRESTAMOS), { fechaDevolucion: new Date() });
  }
}