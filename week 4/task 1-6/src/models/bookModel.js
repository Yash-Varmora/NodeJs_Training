export let books = [
    {
        id: 1,
        title: "book1",
        author: "author1",
    },
    {
        id: 2,
        title: "book2",
        author: "author2",
    }
]

export const addBook = (title, author) => {
    const newBook = { id: books.length + 1, title, author }
    books.push(newBook)
    return newBook
}

export const findBookById = (id) => {
    return books.find(book => book.id === parseInt(id))
}

export const updateBook = (id, title, author) => {
    let book = findBookById(id)
    if (!book) return null
    book = { ...book, title, author }
    return book
}

export const deleteBook = (id) => { 
    const index = books.findIndex(book => book.id === parseInt(id))
    if (index === -1) return null
    const deletedBook = books[index]
    books = books.filter(book => book.id !== parseInt(id))
    return deletedBook
}