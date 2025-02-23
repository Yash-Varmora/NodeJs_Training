// if type: "commonjs" is set in package.json, then the following code will work
/**
 * import { multiply } from "./multiply.mjs"; Not Work in CommonJS
 * because CommonJS ("type": "commonjs") does not support import statements.
 * CommonJS (require) is synchronous and does not support import directly.
 * ES6 Modules (import/export) are asynchronous and require "type": "module" in package.json.
 * If package.json has "type": "commonjs", then import is not allowed in .js files.
 * Since CommonJS doesn't allow import at the top level, use import() inside an async function:
 */
// const sum = require("./sum.js"); // Import CommonJS module

// async function loadMultiply() {
//     const { multiply } = await import("./multiply.mjs"); // Dynamically import ES6 module
//     console.log("Sum:", sum(3, 4)); // Output: Sum: 7
//     console.log("Multiply:", multiply(3, 4)); // Output: Multiply: 12
// }

// loadMultiply();

/**
 * Why Does This Work?
 * import() is a dynamic import, meaning it loads modules at runtime (instead of at the top level).
 * It allows ES6 modules (multiply.mjs) to be used inside CommonJS
 */


/**
 * const sum = require('./sum.js'); Not Work in ES6 Modules
 * because ES6 Modules ("type": "module") do not support require statements.
 * CommonJS (require) is synchronous and doesn't work in "type": "module".
 * ES6 Modules (import/export) are asynchronous and do not support require.
 * If package.json has "type": "module", then require is not allowed in .js files.
 * Since ES6 modules don't allow require, use createRequire from module to import CommonJS modules:
 */

// if type: "module" is set in package.json, then the following code will work
import { createRequire } from "module";
const require = createRequire(import.meta.url); // Enable require in ES Modules

const sum = require("./sum.cjs"); // Import CommonJS module
import { multiply } from "./multiply.mjs"; // Import ES6 module

console.log("Sum:", sum(3, 4)); // Output: Sum: 7
console.log("Multiply:", multiply(3, 4)); // Output: Multiply: 12

/**
 * Why Does This Work?
 * createRequire(import.meta.url) enables CommonJS (sum.js) inside an ES6 module.
 * import is used normally for ES6 modules (multiply.mjs).
 * This allows ES6 modules to import CommonJS while keeping "type": "module".
 */