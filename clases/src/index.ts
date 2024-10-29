// 1. Crear una clase Persona con propiedades como nombre, edad, documento identidad y métodos como caminar(),
// hablar(), comer(). Crear algunos objetos Persona e interactuar con sus propiedades y métodos.
class Persona {
    constructor(
        public nombre: string,
        public edad: number,
        public documento: string
    ) {}

    caminar(): string {
        return `${this.nombre} está caminando`;
    }

    hablar(): string {
        return `${this.nombre} está hablando`;
    }

    comer(): string {
        return `${this.nombre} está comiendo`;
    }
}
// 2. Crear una clase CuentaBancaria con propiedades como número de cuenta, titular y saldo. Agregar métodos para
// depositar, retirar y consultar saldo. Crear varias cuentas y probar los métodos.
class CuentaBancaria {
    constructor(
        public numeroCuenta: string,
        public titular: string,
        private saldo: number = 0
    ) {}

    depositar(monto: number): void {
        this.saldo += monto;
        console.log(`Depósito de ${monto} realizado. Nuevo saldo: ${this.saldo}`);
    }

    retirar(monto: number): void {
        if (monto <= this.saldo) {
            this.saldo -= monto;
            console.log(`Retiro de ${monto} realizado. Nuevo saldo: ${this.saldo}`);
        } else {
            console.log("Saldo insuficiente");
        }
    }

    consultarSaldo(): number {
        return this.saldo;
    }
}
// 3. Crear una clase Vehículo con subclases Coche, Barco y Avión. Cada subclase implementa su propio método
// desplazarse (). Crear objetos de las subclases y probar sus métodos.
abstract class Vehiculo {
    abstract desplazarse(): string;
}

class Coche extends Vehiculo {
    desplazarse(): string {
        return "El coche se desplaza por tierra";
    }
}

class Barco extends Vehiculo {
    desplazarse(): string {
        return "El barco navega por el agua";
    }
}

class Avion extends Vehiculo {
    desplazarse(): string {
        return "El avión vuela por el aire";
    }
}
// 4. Crear una clase FiguraGeometrica y subclases Triángulo, Círculo y Cuadrado. Implementar el método area() en
// cada subclase. Crear objetos y calcular sus áreas.
abstract class FiguraGeometrica {
    abstract area(): number;
}

class Triangulo extends FiguraGeometrica {
    constructor(private base: number, private altura: number) {
        super();
    }

    area(): number {
        return (this.base * this.altura) / 2;
    }
}

class Circulo extends FiguraGeometrica {
    constructor(private radio: number) {
        super();
    }

    area(): number {
        return Math.PI * this.radio ** 2;
    }
}

class Cuadrado extends FiguraGeometrica {
    constructor(private lado: number) {
        super();
    }

    area(): number {
        return this.lado ** 2;
    }
}
// 5. Crear una clase Electrodoméstico con subclases Televisor, Nevera y Lavadora. Cada electrodoméstico tiene
// propiedades como precio y color. Crear algunos objetos y probar.
class Electrodomestico {
    constructor(public precio: number, public color: string) {}
}

class Televisor extends Electrodomestico {
    constructor(precio: number, color: string, public pulgadas: number) {
        super(precio, color);
    }
}

class Nevera extends Electrodomestico {
    constructor(precio: number, color: string, public capacidad: number) {
        super(precio, color);
    }
}

class Lavadora extends Electrodomestico {
    constructor(precio: number, color: string, public carga: number) {
        super(precio, color);
    }
}
// 6. Crear una clase Hotel con propiedades como nombre y ubicación. Crear clase Habitación con número de
// habitación, precio y estado. Agregar métodos para reservar y liberar habitación. Probar con algunos hoteles e
// interacciones.
class Habitacion {
    constructor(
        public numero: number,
        public precio: number,
        private ocupada: boolean = false
    ) {}

    reservar(): void {
        if (!this.ocupada) {
            this.ocupada = true;
            console.log(`Habitación ${this.numero} reservada`);
        } else {
            console.log("Habitación no disponible");
        }
    }

    liberar(): void {
        this.ocupada = false;
        console.log(`Habitación ${this.numero} liberada`);
    }
}

class Hotel {
    private habitaciones: Habitacion[] = [];

    constructor(public nombre: string, public ubicacion: string) {}

    agregarHabitacion(habitacion: Habitacion): void {
        this.habitaciones.push(habitacion);
    }

    obtenerHabitaciones(): Habitacion[] {
        return this.habitaciones;
    }
}
// 7. Crear una clase Película con propiedades como título, duración y director. Crear clase CatalogoPeliculas para
// almacenar películas en una lista. Agregar búsqueda por título y filtrado por director. Probar con un catálogo de
// películas.
class Pelicula {
    constructor(
        public titulo: string,
        public duracion: number,
        public director: string
    ) {}
}

class CatalogoPeliculas {
    private peliculas: Pelicula[] = [];

    agregarPelicula(pelicula: Pelicula): void {
        this.peliculas.push(pelicula);
    }

    buscarPorTitulo(titulo: string): Pelicula | undefined {
        return this.peliculas.find(p => p.titulo.toLowerCase() === titulo.toLowerCase());
    }

    filtrarPorDirector(director: string): Pelicula[] {
        return this.peliculas.filter(p => p.director.toLowerCase() === director.toLowerCase());
    }
}

// Ejemplos de uso:
// 1. Persona
const persona1 = new Persona("Juan", 25, "12345");
console.log(persona1.caminar()); 

// 2. CuentaBancaria
const cuenta1 = new CuentaBancaria("001", "Juan");
cuenta1.depositar(1000);
cuenta1.retirar(500);
console.log(cuenta1.consultarSaldo()); 

// 3. Vehículos
const coche1 = new Coche();
console.log(coche1.desplazarse()); 

// 4. Figuras Geométricas
const triangulo1 = new Triangulo(5, 3);
console.log(triangulo1.area()); 

// 5. Electrodomésticos
const tv1 = new Televisor(500, "negro", 42);
console.log(tv1.precio); 

// 6. Hotel
const hotel1 = new Hotel("Mi Hotel", "Ciudad");
const hab1 = new Habitacion(101, 100);
hotel1.agregarHabitacion(hab1);
hab1.reservar();

// 7. Catálogo de Películas
const catalogo = new CatalogoPeliculas();
const pelicula1 = new Pelicula("Matrix", 136, "Wachowski");
catalogo.agregarPelicula(pelicula1);
console.log(catalogo.buscarPorTitulo("Matrix"));