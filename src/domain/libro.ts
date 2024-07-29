export class Libro {
    id!: string
    portada: string = ''
    titulo: string = ''
    autores: string = ''
    editorial: string = ''
    categoria: string = '' 
    estado: 'disponible' | 'prestado' | 'reservado' = 'disponible'; //inicializo con este valor predeterminado
    anioedito: number = 0
    numpags: number = 0
    idioma: string = ''
    resumen: string = ''
}