class Propietario {
    constructor(public nombre: string, public email: string) {}
  }
  
  class Apartamento {
    constructor(
      public numero: number,
      public habitaciones: number,
      public metros: number,
      public propietarios: Propietario[] = []
    ) {}
  }
  
  class Edificio {
    private apartamentos: Apartamento[] = [];
  
    constructor(public direccion: string) {}
  
    agregarApartamento(apartamento: Apartamento): void {
      this.apartamentos.push(apartamento);
    }
  
    eliminarApartamento(numero: number): void {
      this.apartamentos = this.apartamentos.filter(a => a.numero !== numero);
    }
  
    buscarApartamento(numero: number): Apartamento | undefined {
      return this.apartamentos.find(a => a.numero === numero);
    }
  
    agregarPropietario(numero: number, propietario: Propietario): void {
      const apartamento = this.buscarApartamento(numero);
      if (apartamento) {
        apartamento.propietarios.push(propietario);
      }
    }
  
    cobrarRenta(): void {
      this.apartamentos.forEach(apartamento => {
        console.log(`Cobrando renta a propietarios del apartamento ${apartamento.numero}`);
      });
    }
  }
  
  // Ejemplo de uso:
  const edificio = new Edificio("Calle Principal 123");
  const apto1 = new Apartamento(101, 3, 80);
  edificio.agregarApartamento(apto1);
  
  const propietario1 = new Propietario("Ana", "ana@mail.com");
  edificio.agregarPropietario(101, propietario1);
  
  edificio.cobrarRenta();
  