interface Habitacion {
    numero: number;
    tipo: 'individual' | 'doble' | 'familiar';
    precio: number;
    capacidad: number;
    permiteFumadores: boolean;
    permiteMascotas: boolean;
    disponible: boolean;
}

interface Reserva {
    id: number;
    nombreHuesped: string;
    paisOrigen: string;
    numeroHabitacion: number;
    numeroPersonas: number;
    fechaIngreso: Date;
    fechaSalida: Date;
    conMascota: boolean;
    fumadores: boolean;
    costoTotal: number;
    estado: 'activa' | 'cancelada' | 'completada';
}

let habitaciones: Habitacion[] = [
    { numero: 101, tipo: 'individual', precio: 100, capacidad: 2, permiteFumadores: false, permiteMascotas: false, disponible: true },
    { numero: 102, tipo: 'doble', precio: 150, capacidad: 4, permiteFumadores: true, permiteMascotas: false, disponible: true },
    { numero: 103, tipo: 'familiar', precio: 200, capacidad: 6, permiteFumadores: false, permiteMascotas: true, disponible: true },
    // ... resto de habitaciones
];

let reservas: Reserva[] = [];
let ultiimoId5: number = 0;

function crearReserva(
    nombreHuesped: string,
    paisOrigen: string,
    numeroHabitacion: number,
    numeroPersonas: number,
    fechaIngreso: Date,
    fechaSalida: Date,
    conMascota: boolean,
    fumadores: boolean
): Reserva | null {
    const habitacion = habitaciones.find(h => h.numero === numeroHabitacion);
    
    if (!habitacion || !habitacion.disponible) {
        console.log("Habitación no disponible");
        return null;
    }

    if (numeroPersonas > habitacion.capacidad) {
        console.log("Capacidad excedida para la habitación");
        return null;
    }

    if (conMascota && !habitacion.permiteMascotas) {
        console.log("La habitación no permite mascotas");
        return null;
    }

    if (fumadores && !habitacion.permiteFumadores) {
        console.log("La habitación no permite fumadores");
        return null;
    }

    const dias = Math.ceil((fechaSalida.getTime() - fechaIngreso.getTime()) / (1000 * 60 * 60 * 24));
    const costoTotal = dias * habitacion.precio;

    const nuevaReserva: Reserva = {
        id: ++ultiimoId5,
        nombreHuesped,
        paisOrigen,
        numeroHabitacion,
        numeroPersonas,
        fechaIngreso,
        fechaSalida,
        conMascota,
        fumadores,
        costoTotal,
        estado: 'activa'
    };

    reservas.push(nuevaReserva);
    habitacion.disponible = false;

    return nuevaReserva;
}

function buscarReservas(criterio: string): Reserva[] {
    return reservas.filter(r => 
        r.nombreHuesped.toLowerCase().includes(criterio.toLowerCase()) ||
        r.paisOrigen.toLowerCase().includes(criterio.toLowerCase()) ||
        r.numeroHabitacion.toString() === criterio
    );
}

function calcularIngresoTotal(): number {
    return reservas
        .filter(r => r.estado !== 'cancelada')
        .reduce((total, r) => total + r.costoTotal, 0);
}

function obtenerHabitacionesDisponibles(
    capacidadRequerida?: number,
    permiteMascotas?: boolean,
    permiteFumadores?: boolean
): Habitacion[] {
    return habitaciones.filter(h => 
        h.disponible &&
        (!capacidadRequerida || h.capacidad >= capacidadRequerida) &&
        (!permiteMascotas || h.permiteMascotas) &&
        (!permiteFumadores || h.permiteFumadores)
    );
}

function cancelarReserva(id: number): boolean {
    const reserva = reservas.find(r => r.id === id);
    if (reserva && reserva.estado === 'activa') {
        reserva.estado = 'cancelada';
        const habitacion = habitaciones.find(h => h.numero === reserva.numeroHabitacion);
        if (habitacion) {
            habitacion.disponible = true;
        }
        return true;
    }
    return false;
}

    function obtenerEstadisticas() {
    const reservasActivas = reservas.filter(r => r.estado === 'activa');
    return {
        totalReservas: reservas.length,
        reservasActivas: reservasActivas.length,
        ingresoTotal: calcularIngresoTotal(),
        ocupacionTotal: (reservasActivas.length / habitaciones.length) * 100
    };
}

function testSistemaReservas() {
    console.clear();
    console.log("=== SISTEMA DE RESERVAS DE HOTEL - PRUEBA ===\n");

    try {
        console.log("1. Estado inicial de habitaciones:");
        const habitacionesIniciales = obtenerHabitacionesDisponibles();
        console.table(habitacionesIniciales);

        console.log("\n2. Creando reservas:");
        
        const reserva1 = crearReserva(
            "Juan Pérez",
            "México",
            101,
            1,
            new Date("2024-10-25"),
            new Date("2024-10-28"),
            false,
            false
        );
        console.log("\nReserva 1 creada:");
        console.table(reserva1);

        const reserva2 = crearReserva(
            "María García",
            "España",
            103,
            4,
            new Date("2024-10-26"),
            new Date("2024-10-30"),
            true,
            false
        );
        console.log("\nReserva 2 creada:");
        console.table(reserva2);

        console.log("\n3. Intentando crear reserva inválida (capacidad excedida):");
        const reservaInvalida = crearReserva(
            "Ana López",
            "Argentina",
            102,
            5,
            new Date("2024-11-01"),
            new Date("2024-11-05"),
            false,
            true
        );
        console.log("\n4. Búsqueda de reservas:");
        console.log("Búsqueda por país 'México':");
        console.table(buscarReservas("México"));

        console.log("\nBúsqueda por nombre 'María':");
        console.table(buscarReservas("María"));

        console.log("\n5. Estadísticas actuales:");
        console.table(obtenerEstadisticas());

        if (reserva1) {
            console.log("\n6. Cancelando reserva de Juan Pérez:");
            const cancelacion = cancelarReserva(reserva1.id);
            console.log(`Reserva cancelada: ${cancelacion}`);
        }

        console.log("\n7. Habitaciones que permiten mascotas:");
        const habitacionesConMascotas = obtenerHabitacionesDisponibles(undefined, true, undefined);
        console.table(habitacionesConMascotas);

        console.log("\n8. Estadísticas finales:");
        console.table(obtenerEstadisticas());

    } catch (error) {
        console.error("Error durante la prueba:", error);
    }
}

testSistemaReservas();