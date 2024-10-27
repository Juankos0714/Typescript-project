// 1. Interfaces de Vehículos
// Primero creamos la interface base Vehicle
interface Vehicle {
    model: string;
    year: number;
    color: string;
    brand: string;
    startEngine(): void;
    stopEngine(): void;
}

// Interface Car que hereda de Vehicle
interface Car extends Vehicle {
    motor: string;
    wheels: number;
    hasTrunk: boolean;
    honk(): void;
}

// Interface Motorcycle que hereda de Vehicle
interface Motorcycle extends Vehicle {
    hasABS: boolean;
    engineSize: number;
    doWheelie(): void;
}

// Implementación de la clase Car
class CarImplementation implements Car {
    constructor(
        public model: string,
        public year: number,
        public color: string,
        public brand: string,
        public motor: string,
        public wheels: number,
        public hasTrunk: boolean
    ) {}

    startEngine(): void {
        console.log(`El ${this.brand} ${this.model} está encendido`);
    }

    stopEngine(): void {
        console.log(`El ${this.brand} ${this.model} está apagado`);
    }

    honk(): void {
        console.log("Beep! Beep!");
    }
}

// 2. Interfaces de Usuario y Administrador
interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
}

interface Admin extends User {
    role: string;
    permissions: string[];
    department: string;
}

// Función para imprimir datos de usuario
function printUserInfo(user: User) {
    console.log(`
        ID: ${user.id}
        Nombre: ${user.name}
        Email: ${user.email}
        Creado: ${user.createdAt}
    `);
    
    // Si es admin, mostramos la información adicional
    if ('role' in user) {
        const admin = user as Admin;
        console.log(`
        Rol: ${admin.role}
        Departamento: ${admin.department}
        `);
    }
}

// 3. Interfaces de Producto e Inventario
interface Product {
    name: string;
    price: number;
    sku: string;
    stock: number;
}

interface Inventory {
    products: Product[];
    addProduct(product: Product): void;
    findProduct(sku: string): Product | undefined;
    removeProduct(sku: string): void;
    updateStock(sku: string, quantity: number): void;
}

// Implementación de Inventory
class SimpleInventory implements Inventory {
    products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
        console.log(`Producto ${product.name} agregado al inventario`);
    }

    findProduct(sku: string): Product | undefined {
        return this.products.find(p => p.sku === sku);
    }

    removeProduct(sku: string): void {
        this.products = this.products.filter(p => p.sku !== sku);
        console.log(`Producto con SKU ${sku} eliminado`);
    }

    updateStock(sku: string, quantity: number): void {
        const product = this.findProduct(sku);
        if (product) {
            product.stock = quantity;
            console.log(`Stock actualizado para ${product.name}`);
        }
    }
}

// 4. Interface Base y objetos heredados
interface BaseObject {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

interface UserWithBase extends BaseObject {
    name: string;
    email: string;
}

interface ProductWithBase extends BaseObject {
    name: string;
    price: number;
}

interface OrderWithBase extends BaseObject {
    userId: number;
    products: ProductWithBase[];
    total: number;
}

// Función simple para imprimir datos
function printBaseData(item: BaseObject) {
    console.log(`
        ID: ${item.id}
        Creado: ${item.createdAt}
        Actualizado: ${item.updatedAt}
    `);
}

// 5. Interface Database y implementaciones básicas
interface Database {
    connect(): void;
    disconnect(): void;
    find(query: object): any[];
    findOne(id: number): any;
    update(id: number, data: object): void;
    delete(id: number): void;
    insert(data: object): void;
}

// Implementación simple de MySQL
class MySQLDatabase implements Database {
    connect(): void {
        console.log("Conectando a MySQL...");
    }

    disconnect(): void {
        console.log("Desconectando de MySQL...");
    }

    find(query: object): any[] {
        console.log("Buscando en MySQL:", query);
        return [];
    }

    findOne(id: number): any {
        console.log("Buscando uno en MySQL con id:", id);
        return null;
    }

    update(id: number, data: object): void {
        console.log("Actualizando en MySQL:", id, data);
    }

    delete(id: number): void {
        console.log("Eliminando en MySQL:", id);
    }

    insert(data: object): void {
        console.log("Insertando en MySQL:", data);
    }
}

// Ejemplos de uso
// 1. Crear un carro
const miCarro = new CarImplementation(
    "Corolla",
    2023,
    "Azul",
    "Toyota",
    "2.0L",
    4,
    true
);

miCarro.startEngine();
miCarro.honk();
miCarro.stopEngine();

// 2. Crear y mostrar usuarios
const usuario: User = {
    id: 1,
    name: "Juan",
    email: "juan@mail.com",
    createdAt: new Date()
};

const administrador: Admin = {
    id: 2,
    name: "Ana",
    email: "ana@mail.com",
    createdAt: new Date(),
    role: "admin",
    permissions: ["leer", "escribir"],
    department: "IT"
};

printUserInfo(usuario);
printUserInfo(administrador);

// 3. Usar el inventario
const inventario = new SimpleInventory();
inventario.addProduct({
    name: "Laptop",
    price: 1000,
    sku: "LAP001",
    stock: 5
});

// 4. Usar la base de datos
const baseDeDatos = new MySQLDatabase();
baseDeDatos.connect();
baseDeDatos.insert({ nombre: "Producto 1" });
baseDeDatos.disconnect();