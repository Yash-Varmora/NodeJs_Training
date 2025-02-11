/**
 * Task 13 - Reduce for Aggregation
 * Develop a script that employs the reduce function to find the sum of all elements in an array.
 * Print the original array and the final sum.
 */

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const sum = numbers.reduce((acc, curr) => acc + curr, 0); // reduce() method reduces the array to a single value. It executes a provided function for each value of the array (from left-to-right) and the return value of the function is stored in an accumulator (result/total).

console.log(`Original array: ${numbers}`); // Original array: 1,2,3,4,5,6,7,8,9,10
console.log(`Sum of all elements: ${sum}`); // Sum of all elements: 55
