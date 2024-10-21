interface Nota {
    asignatura: string;
    valor: number;
}

interface Estudiante {
    id: number;
    nombre: string;
    edad: number;
    grado: string;
    notas: Nota[];
    activo: boolean;
}

let estudiantes: Estudiante[] = [];
let ultimoId4: number = 0;

function validarNota(nota: number): boolean {
    return nota >= 0 && nota <= 5;
}

function agregarEstudiante(
    nombre: string,
    edad: number,
    grado: string,
): void {
    if (nombre.trim() === '') {
        console.log("Error: El nombre no puede estar vacío");
        return;
    }
    if (edad < 5 || edad > 20) {
        console.log("Error: La edad debe estar entre 5 y 20 años");
        return;
    }

    const nuevoEstudiante: Estudiante = {
        id: ++ultimoId4,
        nombre,
        edad,
        grado,
        notas: [],
        activo: true
    };
    
    estudiantes.push(nuevoEstudiante);
    console.log(`Estudiante "${nombre}" agregado exitosamente.`);
}

function agregarNota(
    idEstudiante: number,
    asignatura: string,
    valor: number
): void {
    if (!validarNota(valor)) {
        console.log("Error: La nota debe estar entre 0 y 5");
        return;
    }

    const estudiante = estudiantes.find(e => e.id === idEstudiante);
    
    if (!estudiante) {
        console.log("Estudiante no encontrado");
        return;
    }

    const notaExistente = estudiante.notas.findIndex(n => 
        n.asignatura.toLowerCase() === asignatura.toLowerCase()
    );

    if (notaExistente !== -1) {
        estudiante.notas[notaExistente].valor = valor;
        console.log(`Nota de ${asignatura} actualizada para ${estudiante.nombre}`);
    } else {
        estudiante.notas.push({ asignatura, valor });
        console.log(`Nota de ${asignatura} agregada para ${estudiante.nombre}`);
    }
}

function buscarEstudiantePorNombre(nombre: string): Estudiante[] {
    if (nombre.trim() === '') {
        console.log("Error: Nombre de búsqueda inválido");
        return [];
    }

    const resultados = estudiantes.filter(estudiante => 
        estudiante.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    
    if (resultados.length === 0) {
        console.log("No se encontraron estudiantes con ese nombre");
    }
    
    return resultados;
}

function calcularPromedioEstudiante(idEstudiante: number): number {
    const estudiante = estudiantes.find(e => e.id === idEstudiante);
    
    if (!estudiante || estudiante.notas.length === 0) {
        return 0;
    }

    const sumaNotas = estudiante.notas.reduce((sum, nota) => sum + nota.valor, 0);
    return Number((sumaNotas / estudiante.notas.length).toFixed(2));
}

function calcularPromedioGeneral(): number {
    const estudiantesConNotas = estudiantes.filter(e => e.notas.length > 0);
    
    if (estudiantesConNotas.length === 0) {
        console.log("No hay notas registradas para calcular el promedio");
        return 0;
    }

    const sumaPromedios = estudiantesConNotas.reduce((sum, estudiante) => 
        sum + calcularPromedioEstudiante(estudiante.id), 0
    );

    return Number((sumaPromedios / estudiantesConNotas.length).toFixed(2));
}

function mostrarEstudiantes(): void {
    if (estudiantes.length === 0) {
        console.log("No hay estudiantes registrados.");
        return;
    }

    console.log("\nListado de Estudiantes:");
    estudiantes.forEach(estudiante => {
        console.log(`ID: ${estudiante.id}`);
        console.log(`Nombre: ${estudiante.nombre}`);
        console.log(`Edad: ${estudiante.edad}`);
        console.log(`Grado: ${estudiante.grado}`);
        console.log(`Estado: ${estudiante.activo ? 'Activo' : 'Inactivo'}`);
        
        if (estudiante.notas.length > 0) {
            console.log("Notas:");
            estudiante.notas.forEach(nota => {
                console.log(`  ${nota.asignatura}: ${nota.valor}`);
            });
            console.log(`Promedio: ${calcularPromedioEstudiante(estudiante.id)}`);
        } else {
            console.log("No hay notas registradas");
        }
        console.log('-----------------');
    });
}

function cambiarEstadoEstudiante(id: number): void {
    const estudiante = estudiantes.find(e => e.id === id);
    
    if (!estudiante) {
        console.log("Estudiante no encontrado");
        return;
    }
    
    estudiante.activo = !estudiante.activo;
    console.log(`Estado del estudiante ${estudiante.nombre} cambiado a ${estudiante.activo ? 'Activo' : 'Inactivo'}`);
}

function ejemploUso4(): void {
    agregarEstudiante("Ana García", 15, "10°");
    agregarEstudiante("Carlos López", 16, "11°");
    agregarEstudiante("María Rodríguez", 14, "9°");
    
    agregarNota(1, "Matemáticas", 4.5);
    agregarNota(1, "Español", 4.0);
    agregarNota(2, "Matemáticas", 3.8);
    agregarNota(2, "Español", 4.2);
    agregarNota(3, "Matemáticas", 4.7);
    
    mostrarEstudiantes();
    
    console.log("\nBuscando estudiante 'Ana':");
    console.log(buscarEstudiantePorNombre("Ana"));
    
    console.log(`\nPromedio general de todos los estudiantes: ${calcularPromedioGeneral()}`);
    
    cambiarEstadoEstudiante(1);
    
    mostrarEstudiantes();
}

ejemploUso4();