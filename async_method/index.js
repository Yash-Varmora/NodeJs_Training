const fs = require('fs').promises;
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data.json');

const sendResponse = (res, statusCode, message, data = null) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    const response = { message, data };
    return res.end(JSON.stringify(response));
};

const readData = async () => {
    try {
        if (!(await fileExists(DATA_FILE))) return [];
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error('Error reading data:', err);
        return [];
    }
};

const writeData = async (data) => {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing data:', err);
    }
};

const fileExists = async (filePath) => {
    try {
        await fs.access(filePath);
        return true;
    } catch (err) {
        return false;
    }
};

const server = http.createServer(async (req, res) => {
    let books = await readData();

    if (req.method === 'GET' && req.url === '/books') {
        return sendResponse(res, 200, 'Books retrieved successfully', books);
    }

    if (req.method === 'POST' && req.url === '/books') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
            const { title, author, description } = JSON.parse(body);
            if (!title || !author || !description) {
                return sendResponse(res, 400, 'Title, author, and description are required');
            }
            const newBook = { id: uuidv4(), title, author, description };
            books.push(newBook);
            await writeData(books);
            return sendResponse(res, 201, 'Book created successfully', newBook);
        });
        return;
    }

    if (req.method === 'PUT' && req.url.startsWith('/books/')) {
        const id = req.url.split('/')[2];
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
            const { title, author, description } = JSON.parse(body);
            let book = books.find(b => b.id === id);
            if (!book) {
                return sendResponse(res, 404, 'Book not found');
            }
            book.title = title || book.title;
            book.author = author || book.author;
            book.description = description || book.description;
            await writeData(books);
            return sendResponse(res, 200, 'Book updated successfully', book);
        });
        return;
    }

    if (req.method === 'PATCH' && req.url.startsWith('/books/')) {
        const id = req.url.split('/')[2];
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
            const updates = JSON.parse(body);
            let bookIndex = books.findIndex(b => b.id === id);
            if (bookIndex === -1) {
                return sendResponse(res, 404, 'Book not found');
            }
            books[bookIndex] = { ...books[bookIndex], ...updates };
            await writeData(books);
            return sendResponse(res, 200, 'Book updated successfully', books[bookIndex]);
        });
        return;
    }

    if (req.method === 'DELETE' && req.url.startsWith('/books/')) {
        const id = req.url.split('/')[2];
        books = books.filter(b => b.id !== id);
        await writeData(books);
        return sendResponse(res, 200, 'Book deleted successfully');
    }

    if (req.method === 'GET' && req.url.startsWith('/books/search?')) {
        const query = new URLSearchParams(req.url.split('?')[1]);
        const field = query.get('field');
        const value = query.get('value');
        if (!field || !value) {
            return sendResponse(res, 400, 'Field and value required');
        }
        const results = books.filter(book => book[field] && book[field].includes(value));
        return sendResponse(res, 200, 'Search results', results);
    }

    return sendResponse(res, 404, 'Route not found');
});

server.listen(4000, () => console.log('Server running on port 4000'));
