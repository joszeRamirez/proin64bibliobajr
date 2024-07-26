export class Prestamo {
    id!: string;
    libroId!: string;
    userId!: string;
    fechaPrestamo!: Date;
    fechaDevolucion!: Date;
    estado!: 'prestado' | 'devuelto';
}
