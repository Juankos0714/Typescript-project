class Cita {
    constructor(
      public paciente: string,
      public doctor: string,
      public fecha: Date,
      public hora: string,
      public motivo: string
    ) {}
  }
  
  class Agenda {
    private citas: Cita[] = [];
  
    agregarCita(cita: Cita): void {
      this.citas.push(cita);
    }
  
    eliminarCita(cita: Cita): void {
      this.citas = this.citas.filter(c => c !== cita);
    }
  
    buscarCita(doctor: string): Cita[] {
      return this.citas.filter(c => c.doctor === doctor);
    }
  
    citasHoy(): Cita[] {
      const hoy = new Date();
      return this.citas.filter(
        c => c.fecha.toDateString() === hoy.toDateString()
      );
    }
  
    citasFecha(fecha: Date): Cita[] {
      return this.citas.filter(c => c.fecha.toDateString() === fecha.toDateString());
    }
  }
  
  // Ejemplo de uso:
  const agenda = new Agenda();
  agenda.agregarCita(new Cita("Juan", "Dr. Pérez", new Date(), "10:00", "Consulta"));
  console.log(agenda.citasHoy());
  