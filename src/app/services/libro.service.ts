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
      const snapshot = await getDoc(this.document(PATH_LIBROS, id));
      return snapshot.data() as Libro;
    } catch (error) {
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

  updateLibro(id: string, libro: Partial<Libro>) {
    return updateDoc(this.document(PATH_LIBROS, id), { ...libro });
  }

  deleteLibro(id: string) {
    return deleteDoc(this.document(PATH_LIBROS, id));
  }

  addPrestamo(prestamo: Prestamo) {
    return addDoc(collection(this.firestore, PATH_PRESTAMOS), Object.assign({}, prestamo));
  }

  getPrestamos() {
    return getDocs(query(collection(this.firestore, PATH_PRESTAMOS)));
  }

  async registrarDevolucion(prestamoId: string) {
    const prestamoDoc = await getDoc(this.document(PATH_PRESTAMOS, prestamoId));
    const prestamo = prestamoDoc.data() as Prestamo;
    if (prestamo) {
      await deleteDoc(this.document(PATH_PRESTAMOS, prestamoId));
      const libroDoc = await getDoc(this.document(PATH_LIBROS, prestamo.libroId));
      if (libroDoc.exists()) {
        const libro = libroDoc.data() as Libro;
        await updateDoc(this.document(PATH_LIBROS, prestamo.libroId), { ...libro, estado: 'disponible' });
      }
    }
  }

  private document(path: string, id: string) {
    return doc(this.firestore, `${path}/${id}`);
  }
}