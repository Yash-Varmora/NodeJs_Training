/**
 * Task 5 - Hoisting
 * Create a program that demonstrates variable hoisting in JavaScript.
 * Declare variables using both var and let within functions and blocks, and then attempt to access these variables before and after their declarations.
 * Explain the behavior observed in the comments.
 */

// Example of var hoisting:
console.log("Example of var hoisting:")
console.log(x) // undefined
var x = 5
console.log(x) // 5
console.log("=====================================")

// Example of let hoisting:
console.log("Example of let hoisting:")
// console.log(y) // ReferenceError: Cannot access 'y' before initialization
let y = 5
console.log(y) // 5
console.log("=====================================")

/**
 * Behavior observed:
 *      - Variables declared with var are hoisted to the top of the function or block scope.
 *      - Variables declared with let are not hoisted.
 *      - Accessing a variable before its declaration will result in undefined for var and ReferenceError for let.
 */

// Example of var hoisting within a function:
console.log("Example of var hoisting within a function:")

function varHoisting() {
    console.log(a) // undefined
    var a = 5
    console.log(a) // 5
}

varHoisting()
console.log("=====================================")

// Example of let hoisting within a function:
console.log("Example of let hoisting within a function:")

function letHoisting() {
    // console.log(b) // ReferenceError: Cannot access 'b' before initialization
    let b = 5
    console.log(b) // 5
}

letHoisting()
console.log("=====================================")

/**
 * Behavior observed:
 *     - The variable is accessible within the function scope after its declaration.
 *     - The variable is not accessible outside the function scope.
 *     - The behavior is consistent with the hoisting rules for var and let.
 *     - The hoisting behavior is limited to the function scope.
 */

// Example of var hoisting within a block:
console.log("Example of var hoisting within a block:")
{
    console.log(c) // undefined
    var c = 5
    console.log(c) // 5
}
console.log(c) // 5
console.log("=====================================")

// Example of let hoisting within a block:
console.log("Example of let hoisting within a block:")
{
    // console.log(d) // ReferenceError: Cannot access 'd' before initialization
    let d = 5
    console.log(d) // 5
}
// console.log(d)// ReferenceError: d is not defined
console.log("=====================================")

/**
 * Behavior observed:
 *    - Variables declared with var are hoisted to the top of the block scope.
 *    - Variables declared with let are not hoisted within the block scope.
 *    - The hoisting behavior is limited to the block scope.
 *    - The variable is not accessible outside the block scope.
 */

// Example of var hoisting within a block and function:
console.log("Example of var hoisting within a block and function:")

function varHoistingBlock() {
    {
        console.log(e) // undefined
        var e = 5
        console.log(e) // 5
    }
    console.log(e) // 5
}
// console.log(e) // ReferenceError: e is not defined

varHoistingBlock()
console.log("=====================================")

// Example of let hoisting within a block and function:
console.log("Example of let hoisting within a block and function:")

function letHoistingBlock() {
    {
        // console.log(f) // ReferenceError: Cannot access 'f' before initialization
        let f = 5
        console.log(f) // 5
    }
    // console.log(f) // ReferenceError: f is not defined
}
// console.log(f) // ReferenceError: f is not defined

letHoistingBlock()
console.log("=====================================")

/**
 * Behavior observed:
 *      - Variables declared with var are hoisted to the top of the block scope within the function.
 *      - Variables declared with let are not hoisted within the block scope within the function.
 *      - The hoisting behavior is limited to the block scope within the function.
 *      - The variable is not accessible outside the block scope within the function.
 *      - The behavior is consistent with the hoisting rules for var and let within a function.
 */
