import { Injectable } from '@angular/core';
import { Prestamo } from '../../domain/prestamo';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Firestore } from 'firebase/firestore';

const PATH = 'prestamos';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {


  constructor(private firestore: Firestore) { }

  getPrestamos() {
    return getDocs(query(collection(this.firestore, PATH)));
  }

  addPrestamo(prestamo: Prestamo) {
    return addDoc(collection(this.firestore, PATH), Object.assign({}, prestamo));
  }

  registrarDevolucion(prestamoId: string) {
    return updateDoc(doc(this.firestore, `${PATH}/${prestamoId}`), {
      fechaDevolucion: new Date()
    });
  }
}