const fs = require("fs");
const path = require("path");

const sourceFilePath = path.join(__dirname, "source.txt");
const destinationFilePath = path.join(__dirname, "destination.txt");

// read file synchronously

// try {
//     const dataSync = fs.readFileSync(sourceFilePath, "utf-8");
//     console.log("Synchronous Read: ", dataSync);
//     fs.writeFileSync(destinationFilePath, dataSync, "utf-8");
// } catch (error) {
//     console.log("Error reading file synchronously: ", error);
// }

// read file Asynchronously

// fs.readFile(sourceFilePath, "utf-8", (err, dataAsync) => {
//     if (err) return console.log("Error reading file asynchronously: ", err);
//     console.log("Asynchronous Read: ", dataAsync);
//     fs.writeFile(destinationFilePath, dataAsync, "utf-8", (err) => {
//         if(err) console.log("Error writing file asynchronously: ", err);
//     })
// })

// Read file using streams

// const readStream = fs.createReadStream(sourceFilePath, "utf-8");
// const writeStream = fs.createWriteStream(destinationFilePath);

// readStream.on("data", (chunk) => {
//     console.log("stream Read: ", chunk);
//     writeStream.write(chunk);
// })

// readStream.on("end", () => {
//     console.log("Stream Reading Completed");
//     writeStream.end()
// })

// readStream.on("error", (err) => console.log("Stream read error: ", err))
// writeStream.on("error", (err) => console.log("Stream write error", err))