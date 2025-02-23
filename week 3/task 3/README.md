# Task 3 - CRUD using NodeJs HTTP module

## Difference between http and https.

- HTTP (Hypertext Transfer Protocol): A protocol for transferring data over the web. It is not secure, meaning data is transferred in plaintext.
- HTTPS (Hypertext Transfer Protocol Secure): A secure version of HTTP that uses SSL/TLS encryption to protect data, ensuring privacy and integrity.

## REST APIs.

- GET: Retrieve data.
- POST: Create new data.
- PUT: Update existing data.
- DELETE: Delete data.
- PATCH: Partially update a data.
- TRACE: Debugging method that echoes back request details.

## API Endpoints and Responses

### GET /books

**Response:**

```json
[
  {
    "title": "JavaScript",
    "author": "abc",
    "id": "62362f21-aa84-4847-b65f-b87fb1cc7e5f"
  }
]
```

### GET /books/:id

**Response:**

```json
{
  "title": "JavaScript",
  "author": "abc",
  "id": "62362f21-aa84-4847-b65f-b87fb1cc7e5f"
}
```

### POST /books

**Response:**

```json
{
  "message": "Book added",
  "book": {
    "title": "js",
    "author": "abc",
    "id": "62362f21-aa84-4847-b65f-b87fb1cc7e5f"
  }
}
```

### DELETE /books/:id

**Response:**

```json
{ "message": "Book deleted" }
```

### PUT /books/:id

**Response:**

```json
{
  "message": "Book updated",
  "book": {
    "title": "JavaScript",
    "author": "abc",
    "id": "62362f21-aa84-4847-b65f-b87fb1cc7e5f"
  }
}
```
