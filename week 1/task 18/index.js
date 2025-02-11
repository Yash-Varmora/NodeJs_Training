/**
 * Task 18 - Objects basic
 * Create an object called book with properties title, author, and pages.
 * Add a method called displayInfo to the object, which logs a message using the properties to display information about the book.
 * Instantiate the object with sample values and call the displayInfo method.
 */

const book = {
    title: "Book title",
    author: "Author name",
    pages: 18,
    displayInfo: function () {
        console.log(`Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}`); // Title: Book title, Author: Author name, Pages: 18
    }
}

book.displayInfo();
