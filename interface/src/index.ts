// # Ejercicio
// # 1. Crea una interface Vehicle con propiedades comunes a distintos vehículos como model, year, color, etc. Luego
// # crea interfaces Car y Motorcycle que hereden de Vehicle y tengan propiedades específicas, implemente en una
// # clase.
interface vehicle{
    model: string
    year: number
    color: string
    }
interface car extends vehicle{
    motor: string
    wheels: number
    power: number
}
interface Motorcycle  extends vehicle{
    hasABS: boolean
    cylinderCapacity: number

}
class CarImplement implements car{
    model: string;
    year: number;
    color: string;
    motor: string;
    wheels: number;
    power: number;

}
// # 2. Crea una interface User y otra interfaz Admin que herede de User. Crea una función para imprimir datos de
// # usuario que acepte tanto User como Admin.
// # 3. Crea una interface Product con name, price, etc. Crea una interface Inventory que contenga un array de Product
// # y funciones para agregar y buscar productos.
// # 4. Crea una interface BaseObject con una propiedad id. Luego crea interfaces User, Product y Order que hereden de
// # BaseObject. Crea una función genérica que pueda imprimir los datos.
// # 5. Crea una interface Database con funciones como connect, find, update, etc. Luego crea una clase
// # MySQLDatabase e SQLiteDatabase que implementen esa interface con distintas funcionalidades.