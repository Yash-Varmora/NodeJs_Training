/**
 * Task 7 - Let vs Var
 * Develop a program that highlights the differences in scoping between let and var.
 * Create a block-scoped variable using let and a function-scoped variable using var.
 * Attempt to access these variables outside their respective scopes and explain the results in the comments.
 */

// Example of using let for block-scoped variable
{
    let x = 10;
    console.log(x); // Output: 10
}
// console.log(x); // Error: x is not defined
/**
 * Explanation:
 *      - The variable x is accessible within the block scope.
 *      - When attempting to access the variable x outside the block scope, an error is thrown since x is not defined in the global scope.
 *      - This helps in preventing accidental variable access outside the intended scope.
 *      - let provides better scoping and avoids variable hoisting issues.
 *      - It is recommended to use let for block-scoped variables to avoid unintended side effects.
 */

// Example of using var for function-scoped variable
function test() {
    var y = 20;
    console.log(y); // Output: 20
}
test();
// console.log(y); // Error: y is not defined

/**
 * Explanation:
 *     - The variable y is accessible within the function scope.
 *     - When attempting to access the variable y outside the function scope, an error is thrown since y is not defined in the global scope.
 *     - var is function-scoped, which means the variable is hoisted to the top of the function scope.
 *     - It is recommended to use let or const for block-scoped variables to avoid hoisting issues and improve code readability.
 *     - var should be used when backward compatibility with older JavaScript versions is required.
 */

