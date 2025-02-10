/**
 * Task 10 - Array and Array methods
 * Develop a script that uses an array to store the days of the week.
 * Use array methods such as push, pop, shift, or unshift to modify the array.
 * Print the array after each modification. Additionally, use the indexOf method to find the index of a specific day.
 */

// Below methods modify the original array. If you want to keep the original array unchanged, you can create a deep copy of the array before performing these operations using the spread operator or the slice method.

// Array to store the days of the week
let daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

console.log("Initial Array:", daysOfWeek); // Output: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

// Using push to add a new day at the end of the array
daysOfWeek.push("NewDay"); // array.push() method adds a new element to the end of an array and returns the new length of the array.

console.log("Array after push:", daysOfWeek); // Output: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "NewDay"]

// Using pop to remove the last day from the array
daysOfWeek.pop(); // array.pop() method removes the last element from an array and returns that element.

console.log("Array after pop:", daysOfWeek); // Output: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

// Using shift to remove the first day from the array
daysOfWeek.shift(); // array.shift() method removes the first element from an array and returns that element.

console.log("Array after shift:", daysOfWeek); // Output: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

// Using unshift to add a new day at the beginning of the array
daysOfWeek.unshift("FirstDay"); // array.unshift() method adds a new element to the beginning of an array and returns the new length of the array.

console.log("Array after unshift:", daysOfWeek); // Output: ["FirstDay", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

// Using indexOf to find the index of a specific day
let index = daysOfWeek.indexOf("Wednesday"); // array.indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.

console.log("Index of 'Wednesday':", index); // Output: 2
