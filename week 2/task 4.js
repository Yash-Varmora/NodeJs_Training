/**
 * Task 4 - Constructor function and this
 * Create Car constructor function that takes parameters such as name, brand, and year. 
 * Include a method displayInfo that prints the car details. 
 * Create an instance using the constructor function and call the displayInfo method.
 */

function Car(name, brand, year){
    this.name = name;
    this.brand = brand;
    this.year = year;
    this.displayInfo = () => {
        console.log(`Name: ${this.name}, Brand: ${this.brand}, Year: ${this.year}`);
    }
}

const myCar = new Car('Tata', 'Safari', 2025);
myCar.displayInfo();
// Name: Tata, Brand: Safari, Year: 2025
