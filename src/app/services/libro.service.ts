import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { Libro } from '../../domain/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private firestore:Firestore) { }

  getLibros() {
    return getDocs(query(collection(this.firestore, 'libros')))
  }

  addLibro(libro: Libro) {
    addDoc(collection(this.firestore, 'libros'), Object.assign({}, libro))
  }

  getLibro(titulo: string){

  }

  deleteLibro(libro: Libro){

  }
}
