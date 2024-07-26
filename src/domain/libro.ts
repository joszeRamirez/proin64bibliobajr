export class Libro {
    id!: string
    portada: string = ''
    titulo: string = ''
    autores: string = ''
    editorial: string = ''
    estado: 'disponible' | 'prestado' | 'reservado' = 'disponible'; //inicializo con este valor predeterminado
    anioedito: number = 0
    numpags: number = 0
    idioma: string = ''
    resumen: string = ''
}