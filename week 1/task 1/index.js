/**
 * Task 1 - For loops with break and continue
 * Write a JavaScript program that uses a for loop to iterate over an array of numbers.
 * Within the loop, implement a condition to break out of the loop when a number greater than 5 is encountered.
 * Additionally, use continue to skip the iteration when the number is exactly 3.
 * Print the elements before and after applying these control flow statements.
 */

const arr = [1, 2, 3, 5, 1, 3, 1, 6, 2, 3, 5, 6]
console.log("Before Control Flow: ",arr)
console.log("After Control Flow: ")
for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 5) {
        break // Exit the loop when number is greater than 5
    } else if (arr[i] === 3) {
        continue // Skip the iteration when the number is 3
    }
    console.log(arr[i])
}
