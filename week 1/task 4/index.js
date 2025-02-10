/**
 * Task 4 - variable scope
 * Write a JavaScript program with comments explaining the differences between let, var, and const in terms of variable declaration.
 * Include examples that showcase the scope of each type of variable and any restrictions they might have.
 */

/**
 * Differences between let, var, and const in terms of variable declaration.
 * let:
 *  - let is block scoped. It is only available within the block it is declared.
 *  - let can be reassigned.
 *  - let can be declared without initialization.
 *  - let is not hoisted.
 *  - let is not accessible before the declaration.
 * var:
 *  - var is function scoped. It is available within the function it is declared.
 *  - var can be reassigned.
 *  - var can be declared without initialization.
 *  - var is hoisted.
 *  - var is accessible before the declaration.
 * const:
 *  - const is block scoped. It is only available within the block it is declared.
 *  - const cannot be reassigned.
 *  - const must be initialized at the time of declaration.
 *  - const is not hoisted.
 *  - const is not accessible before the declaration.
 */

// Example of let:
console.log("Example of let:")
let x = 5
if (true) {
    let x = 10
    console.log("Inside block: ", x) // 10
}
console.log("Outside block: ", x) // 5
console.log("=====================================")

// Example of var:
console.log("Example of var:")
var y = 5
if (true) {
    var y = 10
    console.log("Inside block: ", y) // 10
}
console.log("Outside block: ", y) // 10
console.log("=====================================")

// Example of const:
console.log("Example of const:")
const z = 5
if (true) {
    const z = 10
    console.log("Inside block: ", z) // 10
}
console.log("Outside block: ", z) // 5
console.log("=====================================")

// Example of let with reassignment:
console.log("Example of let with reassignment:")
let a = 5
a = 10
console.log(a) // 10
console.log("=====================================")

// Example of var with reassignment:
console.log("Example of var with reassignment:")
var b = 5
b = 10
console.log(b) // 10
console.log("=====================================")

// Example of const with reassignment:
const c = 5
// c = 10 // TypeError: Assignment to constant variable.
console.log(c)
console.log("=====================================")

// Example of let without initialization:
console.log("Example of let without initialization:")
let d
d = 10
console.log(d) // 10
console.log("=====================================")

// Example of var without initialization:
console.log("Example of var without initialization:")
var e
e = 10
console.log(e) // 10
console.log("=====================================")

// Example of const without initialization:
// const f // SyntaxError: Missing initializer in const declaration
// f = 10
// console.log(f)
// console.log("=====================================")

// Example of let hoisting:
console.log("Example of let hoisting:")
// console.log(h) // ReferenceError: Cannot access 'h' before initialization
let h = 10
console.log(h)
console.log("=====================================")

// Example of var hoisting:
console.log("Example of var hoisting:")
console.log(i) // undefined
var i = 10
console.log(i)
console.log("=====================================")

// Example of const hoisting:
console.log("Example of const hoisting:")
// console.log(j) // ReferenceError: Cannot access 'j' before initialization
const j = 10
console.log(j)
console.log("=====================================")

// Example of let scope:
console.log("Example of let scope:")
let k = 5
if (true) {
    let k = 10
    console.log("Inside block: ", k) // 10
}
console.log("Outside block: ", k) // 5
console.log("=====================================")

// Example of var scope:
console.log("Example of var scope:")
var l = 5
if (true) {
    var l = 10
    console.log("Inside block: ", l) // 10
}
console.log("Outside block: ", l) // 10
console.log("=====================================")

// Example of const scope:
console.log("Example of const scope:")
const m = 5
if (true) {
    const m = 10
    console.log("Inside block: ", m) // 10
}
console.log("Outside block: ", m) // 5
console.log("=====================================")

// Example of let scope in function:
console.log("Example of let scope in function:")
function letScope() {
    let n = 5
    console.log("Inside function: ", n) // 5
}
letScope()
// console.log(n) // ReferenceError: n is not defined
console.log("=====================================")

// Example of var scope in function:
console.log("Example of var scope in function:")
function varScope() {
    var o = 5
    console.log("Inside function: ", o) // 5
}
varScope()
// console.log(o) // ReferenceError: o is not defined
console.log("=====================================")

// Example of const scope in function:
console.log("Example of const scope in function:")
function constScope() {
    const p = 5
    console.log("Inside function: ", p) // 5
}
constScope()
// console.log(p) // ReferenceError: p is not defined
console.log("=====================================")

// Example of let scope in block:
console.log("Example of let scope in block:")
{
    let q = 5
    console.log("Inside block: ", q) // 5
}
// console.log(q) // ReferenceError: q is not defined
console.log("=====================================")

// Example of var scope in block:
console.log("Example of var scope in block:")
{
    var r = 5
    console.log("Inside block: ", r) // 5
}
console.log("Outside block: ", r) // 5
console.log("=====================================")

// Example of const scope in block:
console.log("Example of const scope in block:")
{
    const s = 5
    console.log("Inside block: ", s) // 5
}
// console.log(s) // ReferenceError: s is not defined
console.log("=====================================")

// Example of let scope in loop:
console.log("Example of let scope in loop:")
for (let t = 0; t < 5; t++) {
    console.log("Inside loop: ", t)
}
// console.log(t) // ReferenceError: t is not defined
console.log("=====================================")

// Example of var scope in loop:
console.log("Example of var scope in loop:")
for (var u = 0; u < 5; u++) {
    console.log("Inside loop: ", u)
}
console.log("Outside loop: ", u) // 5
console.log("=====================================")

// Example of const scope in loop:
// console.log("Example of const scope in loop:")
// for (const v = 0; v < 5; v++) { // TypeError: Assignment to constant variable.
//     console.log("Inside loop: ", v)
// }
// console.log(v)
// console.log("=====================================")

// Example of let scope in if:
console.log("Example of let scope in if:")
if (true) {
    let w = 5
    console.log("Inside if: ", w) // 5
}
// console.log(w) // ReferenceError: w is not defined
console.log("=====================================")

// Example of var scope in if:
console.log("Example of var scope in if:")
if (true) {
    var ab = 5
    console.log("Inside if: ", ab) // 5
}
console.log("Outside if: ", ab) // 5
console.log("=====================================")

// Example of const scope in if:
console.log("Example of const scope in if:")
if (true) {
    const y = 5
    console.log("Inside if: ", y) // 5
}
// console.log(y) // ReferenceError: y is not defined
console.log("=====================================")

// Restriction example of let:
let bb = 5
// let bb = 10 // SyntaxError: Identifier 'bb' has already been declared
console.log(bb)
console.log("=====================================")

// Restriction example of var:
var aa = 5
var aa = 10
console.log(aa) // 10
console.log("=====================================")

// Restriction example of const:
const ac = 5
// const ac = 10 // SyntaxError: Identifier 'ac' has already been declared
console.log(ac)
console.log("=====================================")
