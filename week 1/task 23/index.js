/**
 * Task 23 - Object constructor and prototype
 * Create a constructor function called Person that takes name and age as parameters and assigns them as properties. 
 * Add a method greet to the prototype of the constructor, which logs a greeting message using the person's name. 
 * Instantiate two objects using the Person constructor and call the greet method on both.
 */

function Person(name, age) { 
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function () {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
}

const person1 = new Person("jay", 22);
const person2 = new Person("raj", 25);

person1.greet() // Hello, my name is jay and I am 22 years old.
person2.greet() // Hello, my name is raj and I am 25 years old.