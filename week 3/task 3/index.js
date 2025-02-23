import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "books.json");

const getBook = () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data || "[]");
};

const saveBooks = (books) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2), "utf-8");
};

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    if (req.method === "GET" && req.url === "/books") {
        return res.end(JSON.stringify(getBook()));
    }

    if (req.method === "GET" && req.url.startsWith("/books/")) {
        const id = req.url.split('/')[2];
        const books = getBook();
        const book = books.find(b => b.id === id);
        return res.end(JSON.stringify(book || { message: "Book not found" }));
    }

    if (req.method === "POST" && req.url === "/books") {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
            const books = getBook();
            const newBook = JSON.parse(body);
            newBook.id = uuidv4(); // Generate a unique ID
            books.push(newBook);
            saveBooks(books);
            res.end(JSON.stringify({ message: "Book added", book: newBook }));
        });
        return;
    }

    if (req.method === "PUT" && req.url.startsWith("/books/")) {
        const id = req.url.split('/')[2];
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
            const books = getBook();
            const index = books.findIndex((b) => b.id === id);
            if (index !== -1) {
                books[index] = { ...books[index], ...JSON.parse(body) };
                saveBooks(books);
                res.end(JSON.stringify({ message: "Book updated", book: books[index] }));
            } else {
                res.end(JSON.stringify({ message: "Book not found" }));
            }
        });
        return;
    }

    if (req.method === "DELETE" && req.url.startsWith("/books/")) {
        const id = req.url.split('/')[2];
        const books = getBook();
        const newBooks = books.filter((b) => b.id !== id);
        saveBooks(newBooks);
        return res.end(JSON.stringify({ message: "Book deleted" }));
    }

    res.writeHead(404);
    res.end(JSON.stringify({ message: "Not found" }));
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
