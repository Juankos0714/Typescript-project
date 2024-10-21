interface empleado {
    id: number;
    nombre: string;
    salario: number;
    estado: boolean;
}

let empresa: empleado[] = [];
let lastId: number = 0;

function agregarEmpleado(nombre: string, salario: number): void {
    const nuevoLibro: empleado = {
        id: ++lastId,
        nombre,
        salario,
        estado: true
    };
    
 empresa.push(nuevoLibro);
    console.log(`empleado "${nombre}" agregado exitosamente.`);
}

function buscarEmpleadoPorNombre(nombre: string): empleado[] {
    const resultados = empresa.filter(empleado => 
        empleado.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    
    return resultados;
}

function mostrarEmpleados(): void {
    if  (empresa.length === 0) {
        console.log("La empresa no tiene empleados.");
        return;
    }

    console.log("\nEmpleados en la empresa:");
    empresa.forEach(empleado => {
        console.log(`ID: ${empleado.id}`);
        console.log(`Nombre: ${empleado.nombre}`);
        console.log(`Salario: $${empleado.salario.toFixed(2)}`);
        console.log(`Estado: ${empleado.estado ? 'Activo' : 'Inactivo'}`);
        console.log('-----------------');
    });
}

function calcularSalarioPromedio(): number {
    if (empresa.length === 0) {
        console.log("No hay empleados para calcular el promedio");
        return 0;
    }

    const totalSalarios = empresa.reduce((sum, empleado) => 
        empleado.estado ? sum + empleado.salario : sum, 0
    );
    
    const empleadosActivos = empresa.filter(emp => emp.estado).length;
    const promedio = totalSalarios / empleadosActivos;
    
    return Number(promedio.toFixed(2));
}

function cambiarEstadoEmpleado(id: number): void {
    const empleado = empresa.find(emp => emp.id === id);
    
    if (!empleado) {
        console.log("Empleado no encontrado");
        return;
    }
    
    empleado.estado = !empleado.estado;
    console.log(`Estado del empleado ${empleado.nombre} cambiado a ${empleado.estado ? 'Activo' : 'Inactivo'}`);
}

function actualizarSalario(id: number, nuevoSalario: number): void {
    if (nuevoSalario <= 0) {
        console.log("Error: El salario debe ser mayor que 0");
        return;
    }

    const empleado = empresa.find(emp => emp.id === id);
    
    if (!empleado) {
        console.log("Empleado no encontrado");
        return;
    }
    
    empleado.salario = nuevoSalario;
    console.log(`Salario actualizado para ${empleado.nombre}: $${nuevoSalario}`);
}

function ejemploUso2(): void {
    agregarEmpleado("Juan Pérez", 2500);
    agregarEmpleado("María García", 3000);
    agregarEmpleado("Carlos López", 2800);
    

    mostrarEmpleados();

    const promedio = calcularSalarioPromedio();
    console.log(`\nSalario promedio de la empresa: $${promedio}`);

    console.log("\nBuscando empleado 'Juan':");
    console.log(buscarEmpleadoPorNombre("Juan"));

    cambiarEstadoEmpleado(1);

    actualizarSalario(2, 3200);
   
    mostrarEmpleados();
    console.log(`\nNuevo salario promedio: $${calcularSalarioPromedio()}`);
}


ejemploUso2();