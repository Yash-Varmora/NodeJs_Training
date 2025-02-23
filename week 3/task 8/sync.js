const fs = require("fs");

console.log("start");

try {
    const data = fs.readFileSync("text.txt", "utf8");
    console.log("file data: ", data );
} catch (error) {
    console.log("error: ", error);
}

setTimeout(() => console.log("SetTimeout"), 0)
setImmediate(() => console.log("SetImmediate"))

Promise.resolve().then(() => console.log("Promise resolve"))

console.log("End");

/**
 * output:
 * 
 * start
 * file data:  hi, i am yash
 * End
 * Promise resolve
 * SetTimeout
 * SetImmediate
 */

// Blocks execution until the file is read.
// The event loop handles promises and timers only after file reading is complete.