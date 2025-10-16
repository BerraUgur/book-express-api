const Book = require("../models/Book.js");

// Get all books
const getAllBooks = (req, res) => {
  try {
    const books = Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get books by genre
const getBooksByGenre = (req, res) => {
  try {
    const { genre } = req.query;
    const books = Book.findAll().filter((book) => book.genre.toLowerCase() === genre.toLowerCase());
    res.json(books);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get books by year
const getBooksByYear = (req, res) => {
  try {
    const { year } = req.query;
    const books = Book.findAll().filter((book) => book.year === Number(year));
    res.json(books);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new book
const createBook = (req, res) => {
  try {
    const newBook = { id: Date.now(), ...req.body };
    if (!newBook.title || !newBook.author || !newBook.year || !newBook.genre || !newBook.pages) {
      return res.status(400).json({
        message: "Please complete all fields: title, author, year, genre, pages.",
      });
    }
    const books = Book.findAll();
    if (books.find((book) => book.title === newBook.title)) {
      return res.status(400).json({ message: "Book title must be unique!" });
    }
    Book.create(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update book
const updateBook = (req, res) => {
  try {
    const { id, title, author, year, genre, pages } = req.body;
    if (!title || !author || !year || !genre || !pages) {
      return res.status(400).json({
        message: "Please complete all fields: title, author, year, genre, pages.",
      });
    }
    const updatedBook = Book.update(id, { title, author, year, genre, pages });
    if (updatedBook) {
      res.json({ success: true, book: updatedBook });
    } else {
      res.status(404).json({ success: false, message: "Book not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete book
const deleteBook = (req, res) => {
  try {
    const { bookId } = req.params;
    const findBook = Book.findById(bookId);
    if (findBook) {
      Book.delete(bookId);
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Book not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBooksByGenre,
  getBooksByYear,
  createBook,
  updateBook,
  deleteBook,
};
