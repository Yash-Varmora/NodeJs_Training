/**
 * Task 11 - Map for transformation
 * Write a JavaScript program that uses the map function to transform an array of numbers.
 * Square each element in the array and create a new array with the squared values.
 * Print both the original and transformed arrays.
 */

// Array of numbers
const numbers = [1, 2, 3, 4, 5];

// Using the map function to square each element in the array
const squaredNumbers = numbers.map((num) => num * num); // map() method returns a new array with the results of calling a provided callback function on every element in the array.
// Printing the original and transformed arrays
console.log("Original Array:", numbers); // Output: [1, 2, 3, 4, 5]
console.log("Transformed Array:", squaredNumbers); // Output: [1, 4, 9, 16, 25]
