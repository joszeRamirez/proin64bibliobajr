export class Prestamo {
    id!: string;
    libroId!: string;
    usuarioId!: string;
    fechaPrestamo: Date = new Date();
    fechaDevolucion?: Date;
    estado: 'prestado' | 'devuelto' = 'prestado';
}
