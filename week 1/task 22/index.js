/**
 * Task 22 - Object iteration and method
 * Create an object called student with properties name, age, and an array grades. 
 * Add a method named calculateAverage to the object, which calculates and returns the average of the grades. 
 * Iterate through the object properties using a loop and log each property and its value. 
 * Call the calculateAverage method and log the result.
 */

const student = {
    name: "jay",
    age: 20,
    grades: [90, 80, 70],
    calculateAverage: function () {
        const sum = this.grades.reduce((a, b) => a + b, 0);
        return sum / this.grades.length;
    }
}
// Loop through the object properties and log each property and its value
for (const key in student) {

    // if (student[key]) {
    //     console.log(`${key}: ${student[key]}`);
    // }

    if (Object.hasOwnProperty.call(student, key)) {
        console.log(`${key}: ${student[key]}`);
    }
}

console.log(student.calculateAverage());

/**
 * hasOwnProperty checks if a property is directly on the object (not inherited).
 * Using Object.hasOwnProperty.call(student, key) avoids risks from overriding.
 * call() ensures this refers to student, making the check reliable.
 */