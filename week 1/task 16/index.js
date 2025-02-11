/**
 * Task 16 - “this” with nested function
 * Create a constructor function named Car that takes a brand parameter.
 * Inside the constructor, create an object property carInfo with a nested method named displayInfo.
 * The displayInfo method should use the "this" keyword to access both the brand property of the object and a parameter passed to the displayInfo method.
 * Instantiate a Car object and call the displayInfo method.
 */

function Car(brand) {
    this.brand = brand;
    this.carInfo = {
        displayInfo: function (model) {
            console.log(`Brand: ${this.brand}, Model: ${model}`);
        }
    }
}

const myCar = new Car("Tata");
myCar.carInfo.displayInfo("Safari"); // Brand: undefined, Model: Safari

// fix using arrow function
function Car2(brand) {
    this.brand = brand;
    this.carInfo = {
        displayInfo: (model) => {
            console.log(`Brand: ${this.brand}, Model: ${model}`);
        }
    }
}

const myCar2 = new Car2("Tata");
myCar2.carInfo.displayInfo("Safari"); // Brand: Tata, Model: Safari

// fix using bind
function Car3(brand) {
    this.brand = brand;
    this.carInfo = {
        displayInfo: function (model) {
            console.log(`Brand: ${this.brand}, Model: ${model}`);
        }
    }
}

const myCar3 = new Car3("Tata");
myCar3.carInfo.displayInfo.bind(myCar3)("Safari"); // bind the "this" value to the Car object,  Brand: Tata, Model: Safari

/**
 * Explanation:
 *      - The displayInfo method is a nested function inside the carInfo object.
 *      - When the displayInfo method is called, it is invoked as a standalone function, not as a method of the Car object.
 *      - The "this" keyword inside the displayInfo method refers to the carInfo object, not the Car object.
 *      - To fix this, we can use arrow functions, which inherit the "this" value from the surrounding scope.
 *      - Alternatively, we can use a regular function and bind the "this" value to the Car object.
 *      - In this case, using an arrow function or binding the "this" value to the Car object will correctly reference the brand property.
 */

/**
 * standalone function: a function that is not a method of an object and is not called using the object.method() syntax.
 * bind(): a method that creates a new function with the same body and scope as the original function but with a specific this value.
 */

