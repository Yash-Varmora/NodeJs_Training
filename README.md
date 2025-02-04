# CRUD OPRATION USING FILE SYSTEM

This project demonstrates basic CRUD (Create, Read, Update, Delete) operations on a collection of "books" using Node.js and the file system for data persistence. It utilizes both synchronous and asynchronous methods for file operations.

## Project Structure

-   `async_method/`: Contains the implementation of CRUD operations using asynchronous methods.
    -   `index.js`: Main file with functions for asynchronous file operations and server logic.
-   `sync_method/`: Contains the implementation of CRUD operations using synchronous methods.
    -   `index.js`: Main file with functions for synchronous file operations and server logic.
- `data.json`: A file to store the data in the json format.

## Start the server

-   ### Running the Asynchronous Server
    ```bash
    npm run devAsync or npm run startAsync
    ```
-   ### Running the Synchronous Server
    ```bash
    npm run devSync or npm run startSync
    ```
## API Endpoints

**Base URL:** `http://localhost:4000`

The following endpoints are available in **both** the asynchronous and synchronous server implementations.

| Method | Endpoint             | Description                                                                     | Request Body (if applicable)                                                                                                                                       | Success Response        | Error Responses                                               |
| ------ | -------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | ------------------------------------------------------------- |
| GET    | /books               | Retrieves all books.                                                            | None                                                                                                                                                               | `200 OK` with book array | None                                                          |
| POST   | /books               | Creates a new book.                                                             | `{ "title": "New Book", "author": "New Author", "description": "New Description" }`                                                                                     | `201 Created` with created book | `400 Bad Request` if request body is invalid.                         |
| PUT    | /books/{id}          | Updates a specific book by ID, replacing the entire book.                                                  | `{ "title": "Updated Title", "author": "Updated Author", "description": "Updated Description" }` (all fields required)                                                                         | `200 OK` with updated book | `404 Not Found` if book doesn't exist, `400 Bad Request` if request body is invalid. |
| PATCH    | /books/{id}          | Partially updates a specific book by ID.                                                  | `{ "title": "Updated Title" }` or `{ "author": "Updated Author" }` or `{"description": "updated Description"}` (one or more fields optional)                                                                         | `200 OK` with updated book | `404 Not Found` if book doesn't exist, `400 Bad Request` if request body is invalid. |
| DELETE | /books/{id}          | Deletes a specific book by ID.                                                 | None                                                                                                                                                               | `200 OK` with success message | `404 Not Found` if book doesn't exist                         |
| GET    | /books/search?field={field}&value={value} | Searches for books based on a specific field and value. | `field`: The field to search in (e.g., title, author, description).<br>`value`: The value to search for. | `200 OK` with matching book array                                          | `400 Bad Request` if field or value is missing.                                |

