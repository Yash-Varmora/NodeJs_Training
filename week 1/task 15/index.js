/**
 * task 15 - “this” with arrow functions
 * Define an object called calculator with properties x and y.
 * Add a method named calculate to the object, which takes an operation string ("add", "subtract", "multiply", "divide") and uses an arrow function to perform the corresponding operation on x and y.
 * Inside the arrow function, use the "this" keyword to access the object properties.
 * Test the calculator with different operations.
 */

const calculator = {
    x: 10,
    y: 6,
    calculate: (operation) => {
        switch (operation) {
            case "add":
                return this.x + this.y;
            case "subtract":
                return this.x - this.y;
            case "multiply":
                return this.x * this.y;
            case "divide":
                return this.x / this.y;
            default:
                return "Invalid operation!";
        }
    }
}

console.log(calculator.calculate("add")); // NaN
console.log(calculator.calculate("subtract")); // NaN
console.log(calculator.calculate("multiply")); // NaN
console.log(calculator.calculate("divide")); // NaN

console.log("==============================================");

const calculator2 = {
    x: 10,
    y: 6,
    calculate(operation) {
        const operations = {
            add: () => this.x + this.y,
            subtract: () => this.x - this.y,
            multiply: () => this.x * this.y,
            divide: () => this.x / this.y
        };

        return operations[operation] ? operations[operation]() : "Invalid operation";
    }
}

console.log(calculator2.calculate("add")); // 16
console.log(calculator2.calculate("subtract")); // 4
console.log(calculator2.calculate("multiply")); // 60
console.log(calculator2.calculate("divide")); // 1.6666666666666667

/**
 * Explanation:
 *   - Arrow functions inherit `this` from the surrounding scope.
 *   - In the first example, `this` refers to the global object, not the calculator.
 *   - Regular functions correctly bind `this` to the object.
 *   - Use regular functions for object methods requiring `this`.
 *   - Arrow functions are best for standalone functions.
 */

