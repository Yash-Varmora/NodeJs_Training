/**
 * Task 8 - Best Practices
 * Create a document outlining best practices for variable declaration in modern JavaScript.
 * Include guidelines on when to use let, var, or const, taking into consideration block scoping, hoisting, and the immutability of constants.
 * Provide code examples to illustrate each best practice.
 */

// Best Practices for Variable Declaration in Modern JavaScript:

/**
 * 1. Use const for constants:
 *    - Use const to declare variables that should not be reassigned.
 *    - Constants are immutable, and their values cannot be changed once assigned.
 *    - Use const for values that should remain constant throughout the program.
 */
const name = "jay"
// name = "ram" // Error: Assignment to constant variable
console.log(name) // Output: "jay"
const user = {name: "jay", age: 22}
user.name = "ram" // Allowed: Modifying the object properties is allowed with const as the reference to the object remains constant (not the properties)
console.log(user) // Output: { name: "ram", age: 22 }

/**
 * 2. Use let for block-scoped variables:
 *    - Restricts variable access to its declared block.
 *    - Prevents hoisting issues and unintended side effects.
 *    - Prefer over var for better scoping and maintainability.
 *    - Ideal for loop counters, temporary values, and conditionals.
 */

{
    let age = 22
    console.log(age) // Output: 22
}

// console.log(age) // Error: age is not defined

/**
 * 3. Use var for function-scoped variables:
 *    - Hoisted to the top of the function, which may cause unexpected behavior.
 *    - Useful for backward compatibility with older JavaScript versions.
 *    - Avoid using for block-scoped variables to prevent scoping issues.
 *    - Prefer let or const in modern JavaScript for better maintainability.
 *    - Use var only when function scoping is explicitly needed.
 */

function num() {
    var count = 5
    console.log(count) // Output: 5
}
num()
// console.log(count) // Error: count is not defined

/**
 * 4. Avoid using undeclared variables:
 *    - Use const, let, or var to avoid unexpected behavior and errors.
 *    - Enable strict mode to catch undeclared variables and improve code quality.
 *    - Avoid implicit globals to prevent conflicts and maintain clarity.
 */
// console.log(id) // Error: country is not defined
id = "2161x5dvadvdvd5d1v65"
console.log(id) // Output: "2161x5dvadvdvd5d1v65"

/**
 * 5. Use descriptive variable names:
 *    - Choose meaningful names that reflect the variable’s purpose.
 *    - Avoid single-letter or ambiguous names to improve readability.
 *    - Follow camelCase or snake_case for consistency.
 *    - Avoid reserved keywords to prevent conflicts.
 *    - Meaningful names enhance maintainability and reduce the need for comments.
 *    - Use linters or tools to enforce naming conventions.
 */

let userName = "jay"
let userAge = 22
console.log(userName, userAge) // Output: "jay" 22

/**
 * 6. Initialize variables with appropriate values:
 *    - Set default values to prevent unexpected behavior.
 *    - Use null, 0, false, or an empty string when applicable.
 *    - Avoid using undefined unless explicitly needed.
 *    - Proper initialization prevents errors and improves clarity.
 *    - Choose values consistent with the variable’s purpose and data type.
 *    - Thoughtful initialization leads to more predictable and robust code.
 */

let email = ""
let isAdmin = false
console.log(email, isAdmin) // Output: "" false


/**
 * 7. Avoid reusing variable names:
 *    - Use unique names to prevent confusion and unintended side effects.
 *    - Reusing names can overwrite values and cause logical errors.
 *    - Choose descriptive names that reflect each variable’s purpose.
 *    - Avoid generic names like temp, data, or value in the same scope.
 *    - Clear naming reduces bugs and makes debugging easier.
 */

let movieName = "Avengers"
let directorName = "Russo Brothers"
console.log(movieName, directorName) // Output: "Avengers" "Russo Brothers"
