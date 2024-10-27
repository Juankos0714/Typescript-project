// 1. Crea una interface Vehicle con propiedades comunes a distintos vehículos como model, year, color, etc. Luego
// crea interfaces Car y Motorcycle que hereden de Vehicle y tengan propiedades específicas, implemente en una
// clase.
interface Vehicle {
    model: string;
    year: number;
    color: string;
    brand: string;
    startEngine(): void;
    stopEngine(): void;
}

interface Car extends Vehicle {
    motor: string;
    wheels: number;
    hasTrunk: boolean;
    honk(): void;
}

interface Motorcycle extends Vehicle {
    hasABS: boolean;
    engineSize: number;
    doWheelie(): void;
}

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
// 2. Crea una interface User y otra interfaz Admin que herede de User. Crea una función para imprimir datos de
// usuario que acepte tanto User como Admin.
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

function printUserInfo(user: User) {
    console.log(`
        ID: ${user.id}
        Nombre: ${user.name}
        Email: ${user.email}
        Creado: ${user.createdAt}
    `);

    if ('role' in user) {
        const admin = user as Admin;
        console.log(`
        Rol: ${admin.role}
        Departamento: ${admin.department}
        `);
    }
}
// 3. Crea una interface Product con name, price, etc. Crea una interface Inventory que contenga un array de Product
// y funciones para agregar y buscar productos.
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
// 4. Crea una interface BaseObject con una propiedad id. Luego crea interfaces User, Product y Order que hereden de
// BaseObject. Crea una función genérica que pueda imprimir los datos.
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

function printBaseData(item: BaseObject) {
    console.log(`
        ID: ${item.id}
        Creado: ${item.createdAt}
        Actualizado: ${item.updatedAt}
    `);
}
// 5. Crea una interface Database con funciones como connect, find, update, etc. Luego crea una clase
// MySQLDatabase e SQLiteDatabase que implementen esa interface con distintas funcionalidades.
interface Database {
    connect(): void;
    disconnect(): void;
    find(query: object): any[];
    findOne(id: number): any;
    update(id: number, data: object): void;
    delete(id: number): void;
    insert(data: object): void;
}

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
// 1. Ejemplo de uso de Car
console.log("--- Ejemplo de Carro ---");
const miCarro = new CarImplementation(
    "Civic",
    2023,
    "rojo",
    "Honda",
    "1.5L Turbo",
    4,
    true
);

miCarro.startEngine(); 
miCarro.honk();       
miCarro.stopEngine(); 

// 2. Ejemplo de User y Admin
console.log("\n--- Ejemplo de Usuario y Admin ---");
const usuario: User = {
    id: 1,
    name: "Juan Pérez",
    email: "juan@email.com",
    createdAt: new Date()
};

const administrador: Admin = {
    id: 2,
    name: "Ana García",
    email: "ana@email.com",
    createdAt: new Date(),
    role: "Super Admin",
    permissions: ["crear", "editar", "eliminar"],
    department: "IT"
};

printUserInfo(usuario);     
printUserInfo(administrador); 

// 3. Ejemplo de Inventario
console.log("\n--- Ejemplo de Inventario ---");
const inventario = new SimpleInventory();

const producto1: Product = {
    name: "Laptop",
    price: 999.99,
    sku: "LAP001",
    stock: 5
};

const producto2: Product = {
    name: "Mouse",
    price: 29.99,
    sku: "MOU001",
    stock: 10
};

inventario.addProduct(producto1);
inventario.addProduct(producto2);

const laptopEncontrada = inventario.findProduct("LAP001");
console.log("Producto encontrado:", laptopEncontrada);

inventario.updateStock("LAP001", 3);

// 4. Ejemplo de objetos con BaseObject
console.log("\n--- Ejemplo de objetos con BaseObject ---");
const usuarioBase: UserWithBase = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "María",
    email: "maria@email.com"
};

printBaseData(usuarioBase);

// 5. Ejemplo de Database
console.log("\n--- Ejemplo de Database ---");
const db = new MySQLDatabase();

db.connect();
db.insert({ name: "Producto nuevo", price: 99.99 });
db.find({ category: "electronics" });
db.findOne(1);
db.update(1, { price: 89.99 });
db.delete(1);
db.disconnect();