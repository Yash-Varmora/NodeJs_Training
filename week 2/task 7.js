/**
 * Task 7 - Callback practical
 * Create a function that takes an array and a callback function specifying the operation to be performed on each element of the array. 
 * The function should return a new modified array. (Don’t use map)
 */

const modifiedArray = (arr, cb) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.push(cb(arr[i]));
    }
    return newArr;
}

const numbers = [1, 2, 3, 4, 5];
const doubleNumbers = modifiedArray(numbers, (num) => num * 2);
console.log(doubleNumbers);
// Output: [ 2, 4, 6, 8, 10 ]


