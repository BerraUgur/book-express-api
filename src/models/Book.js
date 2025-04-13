const fs = require('fs');
const path = require('path');

class Book {
  constructor() {
    this.filePath = path.join(__dirname, '..', '..', 'data.json');
  }

  readData() {
    const jsonData = fs.readFileSync(this.filePath);
    return JSON.parse(jsonData);
  }

  writeData(books) {
    fs.writeFileSync(this.filePath, JSON.stringify(books, null, 2));
  }

  findAll() {
    return this.readData();
  }

  findById(id) {
    return this.readData().find((book) => book.id === Number(id));
  }

  create(book) {
    const books = this.readData();
    books.push(book);
    this.writeData(books);
    return book;
  }

  update(id, updatedData) {
    const books = this.readData();
    const updatedBooks = books.map((book) =>
      book.id === Number(id) ? { ...book, ...updatedData } : book
    );
    this.writeData(updatedBooks);
    return this.findById(id);
  }

  delete(id) {
    const books = this.readData();
    const filteredBooks = books.filter((book) => book.id !== Number(id));
    this.writeData(filteredBooks);
    return true;
  }
}

module.exports = new Book();