/**
 * Task 6 - Constants
 * Write a script that utilizes const for declaring constants. Attempt to reassign values to these constants and observe the behavior.
 * Include comments explaining the concept of immutability with const and when it is appropriate to use it.
 */

// Example of using const to declare a constant
const a = 10;
console.log(a); // Output: 10

// Attempting to reassign a value to a constant
// a = 20; // Error: Assignment to constant variable
console.log(a); // Output: 10

// Example of using const for an array, object, or function
const arr = [1, 2, 3];
arr.push(4); // Allowed: Modifying the array contents is allowed with const as the reference to the array remains constant (not the contents)
console.log(arr); // Output: [1, 2, 3, 4]

const obj = { name: "jay", age: 22 };
obj.age = 23; // Allowed: Modifying the object properties is allowed with const as the reference to the object remains constant (not the properties)
console.log(obj); // Output: { name: "jay", age: 23 }

const func = () => {
    const x = 5;
    return x;
}
console.log(func()); // Output: 5


/**
 * Concept of immutability with const:
 *     - Constants declared using const are immutable, meaning their values cannot be changed once assigned.
 *     - Use const when the value of a variable should not change throughout the program.
 *     - Constants are useful for declaring values that are not intended to be reassigned.
 *     - It helps in preventing accidental reassignment of values.
 *     - Constants provide a clear indication that the value should remain constant, making the code more readable and maintainable.
 */
