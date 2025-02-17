/**
 * Task 8 - Sleep function
 * Create sleep function which can stop for loop for given amount of time
 */

function sleep(ms) {
    return setTimeout(() => {
       console.log(`Hello after ${ms} millisecond`);
   }, ms)
}

console.log("start");
sleep(2000);
console.log("end");

// start
// end
// Hello after 2000 millisecond
