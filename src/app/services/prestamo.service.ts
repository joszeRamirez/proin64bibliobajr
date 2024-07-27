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

  async registrarDevolucion(prestamoId: string) {
    const prestamoDoc = this.document(prestamoId);
    const prestamoSnapshot = await getDoc(prestamoDoc);
    if (prestamoSnapshot.exists()) {
      const prestamoData = prestamoSnapshot.data() as Prestamo;
      prestamoData.fechaDevolucion = new Date(); // Asignar una fecha de devolución como Date
      return updateDoc(prestamoDoc, { ...prestamoData });
    }
  }

  private document(id: string) {
    return doc(this.firestore, `${PATH}/${id}`);
  }
}