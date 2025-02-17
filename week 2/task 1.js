/**
 * Task 1 - Function Currying
 * Create example of function currying using closure and bind Ex. multiply by 2 from multiplication function
 */

// currying is a functional programming technique where a function with multiple arguments is transformed into a   series of functions, each taking a single argument.

// using closure

function multiply(a) {
    return function (b) {
        return a * b;
    }
}

const multiplyBy2 = multiply(2);
console.log(multiplyBy2(5)); // 10

//  above is an example of closures because the inner function "remembers" the value of "a" even after multiply has finished execution.

// curring using bind

function multiplyB(a, b) {
    return a * b;
}
const multiplyBBy2 = multiplyB.bind(null, 2);
console.log(multiplyBBy2(5)); // 10

//  above is an example of bind because the bind method is used to set the this keyword of a function in strict mode and to pre-specify the 'this' value for a function that is scheduled to be invoked in the future. It returns a new function that has its 'this' keyword set to the provided value, with a given sequence of arguments preceding any provided when the function is called.
    