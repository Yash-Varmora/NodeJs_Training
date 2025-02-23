console.log(process.argv[2]);
const name = process.argv[2];
if (name.length === 0) {
    console.log("Please provide your name.");
} else {
    console.log(`Hello, ${name}!`);
}

