/**
 * Task 2 - while loop with forEach
 * Create a program that uses a while loop to iterate through an array of strings.
 * Inside the loop, use forEach to print each string with an appended exclamation mark.
 * The loop should terminate once the length of the current string exceeds 8 characters.
 * Comment on the differences between while and forEach in this context.
 */

const arr = ["jay", "ram", "raj", "apple", "car", "string", "123456789"];
let i = 0;

while (i < arr.length) {
    if (arr[i].length > 8) {
        console.log(`${arr[i]} is greater than 8 characters`)
        break
    }
    console.log(`iteration ${i +1}: `)
    arr.forEach((str) => {
        console.log(str + "!")
    })
    i++
    console.log("=====================================")
}

// while (true){
//     if (arr[i].length > 8) {
//         console.log(`${arr[i]} is greater than 8 characters`)
//         break
//     }
//     // But below forEach is equivalent to console.log(arr[i] + "!")
//     [arr[i]].forEach((str) => {
//         console.log(str + "!")
//     })
//     i++
// }

/**
 * Differences between while and forEach.
 * usage:
 *      - while loop is used to iterate over arrays depends on condition.
 *      - foreach is used to iterate over arrays.
 * syntax:
 *     - while loop syntax is while(condition){...}, it requires a condition to be true to execute the code.
 *     - foreach syntax is array.forEach((element) => {...}), it requires a callback function to executed for each element in the array.
 * termination:
 *    - while loop terminates when the condition is false. It can be terminated using break statement.
 *    - foreach loop terminates when all elements in the array have been iterated. If we need to terminate the loop before all elements are iterated, we can use return with condition.
 * iteration control:
 *    - while loop requires manual iteration control using a variable(i++, i--, etc.).
 *    - foreach loop automatically iterates through all elements in the array.
 * flexibility:
 *    - while loop work with any data type.
 *    - foreach loop is only for arrays.
 * performance:
 *    - while loop is faster than foreach loop. because foreach is slower in some cases due to function calls.
 */
