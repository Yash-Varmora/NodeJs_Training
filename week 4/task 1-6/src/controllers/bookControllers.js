import { addBook, books, deleteBook, findBookById, updateBook } from "../models/bookModel.js"
import CustomError from "../utils/CustomError.js";


export const getAllBooks = (req, res, next) => {
    try {
        res.status(200).json({ success: true, message: "All books", data: books })
    } catch (error) {
        next(new CustomError("Failed to fetch books", 500));
    }
}

export const getBookById = (req, res,next) => {
    try{
    const book = findBookById(req.params.id);
        if (!book) {
            throw new CustomError("Book not found", 404);
    }
        res.status(200).json({ success: true, message: "Book found", data: book })
    } catch (error) {
        next(error);
    }
}

export const createBook = (req, res, next) => {
    try{
    const { title, author } = req.body
    if (!title || !author) {
        throw new CustomError("Title and author are required", 400);
    }
    const newBook = addBook(title, author)
        res.status(201).json({ success: true, message: "Book created", data: newBook })
    } catch (error) {
        next(error);
    }
}

export const updateBookById = (req, res, next) => {
    try {
    const { id } = req.params;
    const { title, author } = req.body;
    const updatedBook = updateBook(id, title, author)
    if (!updatedBook) {
       throw new CustomError("Book not found", 404);
    }
        res.status(200).json({ success: true, message: "Book updated", data: updatedBook })
    } catch (error) {
        next(error);
    }
}

export const deleteBookById = (req, res, next) => {
    try {
    const { id } = req.params;
    const deletedBook = deleteBook(id)
    if (!deletedBook) {
        throw new CustomError("Book not found", 404);
    }
    res.status(200).json({
        success: true, message: "Book deleted", data: deletedBook
    })
    } catch (error) {
        next(error);
    }
}