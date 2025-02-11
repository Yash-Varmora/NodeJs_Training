/**
 * Task 19 - reference and modification
 * Create two objects named originalObject and modifiedObject. 
 * Assign the same properties to both objects. 
 * Modify one property in modifiedObject and observe how it affects the other object due to reference. 
 * Log the properties of both objects to the console.
 */

const originalObject = {
    name: 'raj',
    age: 22,
    occupation: 'Developer'
};
const modifiedObject = originalObject; // reference to originalObject
modifiedObject.age = 23; // modifying the age property in modifiedObject
console.log(originalObject); // { name: 'raj', age: 23, occupation: 'Developer' }
console.log(modifiedObject); // { name: 'raj', age: 23, occupation: 'Developer' }

/**
 * Both objects are now referencing the same memory location, so any changes made to one object will affect the other object as well.
 * This is because JavaScript uses call-by-reference for objects, meaning that when you assign an object to a new variable, both variables point to the same object in memory.
 * To avoid this behavior, you can use the spread operator or Object.assign() to create a new object with the desired properties, like this: const modifiedObject = { ...originalObject, age: 23 }; or const modifiedObject = Object.assign({}, originalObject, { age:23 }); This way, you create a new object that is a copy of the original object, and any changes made to the new object will not affect the original object.
 */