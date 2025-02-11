/**
 * Task 20 - shallow vs deep copy
 * Create an object called originalPerson with properties name, age, and an array hobbies. 
 * Use both shallow copy and deep copy techniques to create a new object called shallowCopyPerson and deepCopyPerson. 
 * Modify the hobbies array in one of the copies and observe how it affects the original object. 
 * Log the properties of all three objects. 
 */

const originalPerson = {
    name: "jay",
    age: 22,
    hobbies: ["reading", "coding", "gaming"]
}

// Shallow copy using Object.assign
const shallowCopyPerson1 = Object.assign({}, originalPerson);

// Shallow copy using spread operator
const shallowCopyPerson2 = { ...originalPerson };

// Deep copy using JSON.parse and JSON.stringify
const deepCopyPerson1 = JSON.parse(JSON.stringify(originalPerson));

// Deep copy using structuredClone
const deepCopyPerson2 = structuredClone(originalPerson);

// Modify the hobbies array in the shallow copy
shallowCopyPerson1.hobbies.push("swimming");


console.log("Original Person:", originalPerson); // Original Person: { name: 'jay', age: 22, hobbies: [ 'reading', 'coding', 'gaming', 'swimming' ] }
console.log("Shallow Copy Person 1 (Object.assign):", shallowCopyPerson1); // Shallow Copy Person 1 (Object.assign): { name: 'jay', age: 22, hobbies: [ 'reading', 'coding', 'gaming', 'swimming' ] }
console.log("Shallow Copy Person 2 (Spread Operator):", shallowCopyPerson2); // Shallow Copy Person 2 (Spread Operator): { name: 'jay', age: 22, hobbies: [ 'reading', 'coding', 'gaming', 'swimming' ] }
console.log("Deep Copy Person 1 (JSON):", deepCopyPerson1); // Deep Copy Person 1 (JSON): { name: 'jay', age: 22, hobbies: [ 'reading', 'coding', 'gaming' ] }
console.log("Deep Copy Person 2 (structuredClone):", deepCopyPerson2); // Deep Copy Person 2 (structuredClone): { name: 'jay', age: 22, hobbies: [ 'reading', 'coding', 'gaming' ] }

/**
 * Explanation:
 * - Shallow Copy:
 *   - Object.assign: Creates a shallow copy of the object. Only the top-level properties are copied. Nested objects/arrays are still referenced.
 *   - Spread Operator: Similar to Object.assign, creates a shallow copy. It is a more concise syntax.
 * - Deep Copy:
 *   - JSON.parse and JSON.stringify: Converts the object to a JSON string and then parses it back to an object. This method does not copy functions or handle undefined values.
 *   - structuredClone: A modern method to create a deep copy of an object, including nested objects/arrays. It can handle more complex data types like Date, RegExp, Map, Set, etc.
 * - The shallow copies (shallowCopyPerson1 and shallowCopyPerson2) share the same reference for the hobbies array with the originalPerson.
 *   Therefore, modifying the hobbies array in shallowCopyPerson1 also affects the originalPerson.
 * - The deep copies (deepCopyPerson1 and deepCopyPerson2) have their own separate copies of the hobbies array.
 *   Therefore, modifying the hobbies array in shallowCopyPerson1 does not affect the deep copies.
 */
