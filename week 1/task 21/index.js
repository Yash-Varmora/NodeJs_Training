/**
 * Task 21 - Object comparison
 * Create two objects user1 and user2 with similar properties. 
 * Write a function compareObjects that compares the properties of both objects. 
 * The function should log whether the objects are equal or not based on their properties. 
 * Test the function with user1 and user2
 */

const user1 = {
    name: "meet",
    age: 20,
    occupation: "student"
}

const user2 = {
    name: "meet",
    age: 20,
    occupation: "student"
}

function compareObjects(obj1, obj2) {
    if (obj1 === obj2) {
        console.log("Objects are equal");
    } else {
        console.log("Objects are not equal");
    }
}

// convert object in to string and compare
function compareObjects2(obj1, obj2) {
    if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
        console.log("Objects are equal");
    } else {
        console.log("Objects are not equal");
    }
}

 // Objects are compared by reference, so even if they have the same properties, different object instances will not be considered equal.
compareObjects(user1, user2) // Objects are not equal

// Works for simple objects but fails if property order is different.
compareObjects2(user1, user2) // Objects are equal


