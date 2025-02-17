/**
 * Task 11 - Create magic function
 * Create function that in which you have to pass number in diff function call and when you want result at the end you have to call function with no argument.
 * Ex. magicFunction(2)(3)(4)(5)() 
 * output: 14
 */

function magicFunction(a) {
    let s = a
    function sum(a) {
        if (a === undefined) return s;
        s += a;
        return sum;
    }
    return sum;
}
console.log(magicFunction(2)(3)(4)(5)());