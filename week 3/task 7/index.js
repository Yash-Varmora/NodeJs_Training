const processArgs = process.argv.slice(2);

if (processArgs.length !== 3) {
    console.log("3 command line argument needed.");
    process.exit(1)
}

const [num1, num2, operation] = processArgs;

const a = parseFloat(num1);
const b = parseFloat(num2);

if (isNaN(a) || isNaN(b)) {
    console.log("both arguments must be valid number");
    process.exit(1)
}

switch (operation.toLowerCase()) {
    case "+":
    case "plus":
    case "add":
        console.log("result: ", a + b);
        break
    case "-":
    case "minus":
    case "subtract":
        console.log("result: ", a - b);
        break
    case "*":
    case "multiply":
        console.log("result: ", a * b);
        break
    case "/":
    case "divide":
        if (b === 0) {
            console.log("Division by zero is not allowed");
            process.exit(1)
        }
        console.log("result: ", a / b);
        break
    default:
        console.log("unsupported operation");
        process.exit(1)
}
