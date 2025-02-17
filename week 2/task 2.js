/**
 * Task 2 - map, filter and reduce
 * Create program of which required map, filter chaining, and after that replace that with reduce
 * Ex. 
    const students = [
        { name: 'jeel', age: 21 },
        { name: 'franklin', age: 25 },
        { name: 'vivek', age: 26 },
        { name: 'hardik', age: 23 },
    ]
 * create array of name of student  whose age is greater than 18
 */

const students = [
    { name: 'jeel', age: 21 },
    { name: 'franklin', age: 25 },
    { name: 'vivek', age: 26 },
    { name: 'hardik', age: 23 },
]

// map, filter chaining
const names = students
    .filter(student => student.age > 18)
    .map(student => student.name)
console.log(names) // [ 'jeel', 'franklin', 'vivek', 'hardik' ]

// using reduce

const namesUsingReduce = students
    .reduce((acc, student) => student.age > 18 ? [...acc, student.name] : acc, [])
console.log(namesUsingReduce) // [ 'jeel', 'franklin', 'vivek', 'hardik' ]

