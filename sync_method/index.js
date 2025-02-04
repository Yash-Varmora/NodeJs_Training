const fs = require('fs');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data.json');

const readData = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) return [];
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing data:', error);
    }
};

const server = http.createServer((req, res) => {
    let books = readData();
    
    if (req.method === 'GET' && req.url === '/books') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(books));
    }
    
    if (req.method === 'POST' && req.url === '/books') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const { title, author, description } = JSON.parse(body);
                if (!title || !author || !description) throw new Error('Title, author and description are required');
                const newBook = { id: uuidv4(), title, author, description };
                books.push(newBook);
                writeData(books);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newBook));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    }
    
    if (req.method === 'PUT' && req.url.startsWith('/books/')) {
        const id = req.url.split('/')[2];
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const { title, author, description } = JSON.parse(body);
                let book = books.find(b => b.id === id);
                if (!book) throw new Error('Book not found');
                book.title = title || book.title;
                book.author = author || book.author;
                book.description = description || book.description;
                writeData(books);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(book));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    }
    
    if (req.method === 'PATCH' && req.url.startsWith('/books/')) {
        const id = req.url.split('/')[2];
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const updates = JSON.parse(body);
                let bookIndex = books.findIndex(b => b.id === id);
                if (bookIndex === -1) throw new Error('Book not found');
                books[bookIndex] = { ...books[bookIndex], ...updates };
                writeData(books);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(books[bookIndex]));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    }
    
    if (req.method === 'DELETE' && req.url.startsWith('/books/')) {
        const id = req.url.split('/')[2];
        books = books.filter(b => b.id !== id);
        writeData(books);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Book deleted' }));
    }
    
    if (req.method === 'GET' && req.url.startsWith('/search?')) {
        const query = new URLSearchParams(req.url.split('?')[1]);
        const field = query.get('field');
        const value = query.get('value');
        if (!field || !value) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Field and value required' }));
        }
        const results = books.filter(book => book[field] && book[field].includes(value));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    }
    
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
});

server.listen(4000, () => console.log('Server running on port 4000'));
