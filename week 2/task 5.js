/**
 * Task 5 - setTimeout practical
 * Create simple program that will print 1 to n at the interval of 1 second using setTimeout
 */

function print(n) {
    let i = 1;
    function print() {
        console.log(i);
        i++;
        if (i <= n) {
            setTimeout(print, 1000);
        }
    }
    print();
}
    
print(10);

// const a = (n) => {
//     let i = 1;
//     const a = () => {
//         console.log(i);
//         i++;
//         if (i <= n) {
//             setTimeout(a, 1000);
//             }
//     }
//     a();
// }
// a(10);