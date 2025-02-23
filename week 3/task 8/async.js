const fs = require("fs");

console.log("start");

fs.readFile("text.txt", "utf8", (err, data) => {
    if (err) {
        console.log("error: ", err);
        return;
    }
    console.log("File data: ", data);
})


setTimeout(() => console.log("SetTimeout"), 0)
setImmediate(() => console.log("SetImmediate"))

Promise.resolve().then(() => console.log("Promise resolve"))

console.log("End");


/**
 * output:
 * 
 * start
 * End
 * Promise resolve
 * SetTimeout
 * SetImmediate
 * file data:  hi, i am yash
 */

// Non - blocking: fs.readFile defers execution, allowing other tasks to proceed.
// Promise and timers execute before file reading is complete.

// If there is no I/O operation, setTimeout(0) may execute before setImmediate because the timers phase runs before the check phase in the event loop. However, if an I/O operation (like fs.readFile) is present, setImmediate executes first since the event loop processes I/O callbacks before the check phase, followed by the timers phase where setTimeout(0) runs.