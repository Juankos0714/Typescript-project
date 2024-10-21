interface Producto {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
    categoria: string;
}

let inventario: Producto[] = [];
let ultimId: number = 0;

function agregarProducto(
    nombre: string, 
    precio: number, 
    cantidad: number, 
    categoria: string
): void {
    if (nombre.trim() === '') {
        console.log("Error: El nombre del producto no puede estar vacío");
        return;
    }
    if (precio <= 0) {
        console.log("Error: El precio debe ser mayor que 0");
        return;
    }
    if (cantidad < 0) {
        console.log("Error: La cantidad no puede ser negativa");
        return;
    }

    const nuevoProducto: Producto = {
        id: ++ultimId,
        nombre,
        precio,
        cantidad,
        categoria
    };
    
    inventario.push(nuevoProducto);
    console.log(`Producto "${nombre}" agregado exitosamente.`);
}

function buscarProductoPorNombre(nombre: string): Producto[] {
    if (nombre.trim() === '') {
        console.log("Error: Nombre de búsqueda inválido");
        return [];
    }

    const resultados = inventario.filter(producto => 
        producto.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    
    if (resultados.length === 0) {
        console.log("No se encontraron productos con ese nombre");
    }
    
    return resultados;
}

function mostrarInventario(): void {
    if (inventario.length === 0) {
        console.log("El inventario está vacío.");
        return;
    }

    console.log("\nProductos en inventario:");
    inventario.forEach(producto => {
        console.log(`ID: ${producto.id}`);
        console.log(`Nombre: ${producto.nombre}`);
        console.log(`Precio: $${producto.precio.toFixed(2)}`);
        console.log(`Cantidad: ${producto.cantidad}`);
        console.log(`Categoría: ${producto.categoria}`);
        console.log(`Valor total: $${(producto.precio * producto.cantidad).toFixed(2)}`);
        console.log('-----------------');
    });
}

function calcularValorTotalInventario(): number {
    const valorTotal = inventario.reduce((total, producto) => 
        total + (producto.precio * producto.cantidad), 0
    );
    
    return Number(valorTotal.toFixed(2));
}

function actualizarStock(id: number, nuevaCantidad: number): void {
    if (nuevaCantidad < 0) {
        console.log("Error: La cantidad no puede ser negativa");
        return;
    }

    const producto = inventario.find(p => p.id === id);
    
    if (!producto) {
        console.log("Producto no encontrado");
        return;
    }
    
    producto.cantidad = nuevaCantidad;
    console.log(`Stock actualizado para ${producto.nombre}: ${nuevaCantidad} unidades`);
}

function actualizarPrecio(id: number, nuevoPrecio: number): void {
    if (nuevoPrecio <= 0) {
        console.log("Error: El precio debe ser mayor que 0");
        return;
    }

    const producto = inventario.find(p => p.id === id);
    
    if (!producto) {
        console.log("Producto no encontrado");
        return;
    }
    
    producto.precio = nuevoPrecio;
    console.log(`Precio actualizado para ${producto.nombre}: $${nuevoPrecio}`);
}

function obtenerProductosPorCategoria(categoria: string): Producto[] {
    return inventario.filter(producto => 
        producto.categoria.toLowerCase() === categoria.toLowerCase()
    );
}

function verificarBajoStock(limiteMinimo: number = 5): Producto[] {
    return inventario.filter(producto => producto.cantidad <= limiteMinimo);
}

function ejemploUso3(): void {
    agregarProducto("Laptop HP", 999.99, 10, "Electrónicos");
    agregarProducto("Mouse Inalámbrico", 29.99, 20, "Accesorios");
    agregarProducto("Monitor 24'", 299.99, 5, "Electrónicos");
    agregarProducto("Teclado Mecánico", 89.99, 15, "Accesorios");
    
    mostrarInventario();
    
    const valorTotal = calcularValorTotalInventario();
    console.log(`\nValor total del inventario: $${valorTotal}`);
    
    console.log("\nBuscando productos 'Mouse':");
    console.log(buscarProductoPorNombre("Mouse"));
    
    actualizarStock(1, 8);
    
    actualizarPrecio(2, 34.99);
    
    console.log("\nProductos en categoría 'Electrónicos':");
    console.log(obtenerProductosPorCategoria("Electrónicos"));
    
    console.log("\nProductos con bajo stock:");
    console.log(verificarBajoStock());
    
    mostrarInventario();
}

ejemploUso3();