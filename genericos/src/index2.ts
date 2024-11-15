class Producto {
    constructor(public nombre: string, public precio: number) {}
  }
  
  class CajaRegistradora {
    private productos: Producto[] = [];
    private total: number = 0;
  
    cobrar(producto: Producto): void {
      this.productos.push(producto);
      this.total += producto.precio;
    }
  
    imprimirTicket(): void {
      console.log("Productos:");
      this.productos.forEach(p =>
        console.log(`${p.nombre}: $${p.precio.toFixed(2)}`)
      );
      console.log(`Total: $${this.total.toFixed(2)}`);
    }
  }
  
  // Ejemplo de uso:
  const caja = new CajaRegistradora();
  caja.cobrar(new Producto("Manzana", 1.2));
  caja.cobrar(new Producto("Pan", 2.5));
  caja.imprimirTicket();
  