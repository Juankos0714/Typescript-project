interface Libro {
    id: number;
    titulo: string;
    autor: string;
    disponible: boolean;
}

let biblioteca: Libro[] = [];
let ultimoId: number = 0;

function agregarLibro(titulo: string, autor: string): void {
    const nuevoLibro: Libro = {
        id: ++ultimoId,
        titulo,
        autor,
        disponible: true
    };
    
    biblioteca.push(nuevoLibro);
    console.log(`Libro "${titulo}" agregado exitosamente.`);
}

function buscarLibroPorTitulo(titulo: string): Libro[] {
    const resultados = biblioteca.filter(libro => 
        libro.titulo.toLowerCase().includes(titulo.toLowerCase())
    );
    
    return resultados;
}

function mostrarLibros(): void {
    if (biblioteca.length === 0) {
        console.log("La biblioteca está vacía.");
        return;
    }

    console.log("\nLibros en la biblioteca:");
    biblioteca.forEach(libro => {
        console.log(`ID: ${libro.id}`);
        console.log(`Título: ${libro.titulo}`);
        console.log(`Autor: ${libro.autor}`);
        console.log(`Estado: ${libro.disponible ? 'Disponible' : 'No disponible'}`);
        console.log('-----------------');
    });
}

function prestarLibro(id: number): void {
    const libro = biblioteca.find(l => l.id === id);
    
    if (!libro) {
        console.log("Libro no encontrado.");
        return;
    }
    
    if (!libro.disponible) {
        console.log("El libro no está disponible para préstamo.");
        return;
    }
    
    libro.disponible = false;
    console.log(`Libro "${libro.titulo}" prestado exitosamente.`);
}


function devolverLibro(id: number): void {
    const libro = biblioteca.find(l => l.id === id);
    
    if (!libro) {
        console.log("Libro no encontrado.");
        return;
    }
    
    if (libro.disponible) {
        console.log("El libro ya está en la biblioteca.");
        return;
    }
    
    libro.disponible = true;
    console.log(`Libro "${libro.titulo}" devuelto exitosamente.`);
}


function ejemploUso(): void {
    
    agregarLibro("Don Quijote de la Mancha", "Miguel de Cervantes");
    agregarLibro("Cien años de soledad", "Gabriel García Márquez");
    agregarLibro("El principito", "Antoine de Saint-Exupéry");
    
    
    mostrarLibros();
    
    
    const busqueda = buscarLibroPorTitulo("quijote");
    console.log("\nResultados de búsqueda:", busqueda);
    
    
    prestarLibro(1);
    
    
    mostrarLibros();
    
    
    devolverLibro(1);
}


ejemploUso();