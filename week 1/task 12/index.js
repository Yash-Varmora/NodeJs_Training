/**
 * Task 12 - Filter for selection
 * Create a program that utilizes the filter function to extract even numbers from an array of integers.
 * Print the original array and the filtered array containing only even numbers.
 */

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Using the filter function to extract even numbers from the array
const evenNumbers = numbers.filter((num) => num % 2 === 0); // filter() method creates a new array with all elements that pass the test implemented by the provided function.

// Printing the original and filtered arrays
console.log("Original Array:", numbers); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log("Filtered Array (Even Numbers):", evenNumbers); // Output: [2, 4, 6, 8, 10]