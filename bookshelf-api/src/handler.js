const { nanoid } = require('nanoid');
const booksData = require('./data');
const { checkFinished } = require('./utils');

// Add New Book Handler
const addBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = checkFinished(pageCount, readPage);
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  booksData.push(newBook);

  const isSuccess = booksData.some((book) => book.id === id);

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan buku, mohon isi data buku dengan benar',
  });
  response.code(500);
  return response;
};

// Get all book handler
const getManyBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = booksData;

  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (reading !== undefined) {
    // if "reading param" above 1 it will true and false if under 1
    const isReading = Number(reading) === 1;
    filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
  }

  if (finished !== undefined) {
    const isFinished = Number(finished) === 1;
    filteredBooks = filteredBooks.filter(
      (book) => book.finished === isFinished
    );
  }

  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });

  response.code(200);
  return response;
};

// Get book by ID handler
const getBookById = (request, h) => {
  const { bookId } = request.params;
  // find will return object, and undefined if the book not found
  const bookDetail = booksData.find((book) => book.id === bookId);

  if (bookDetail) {
    const response = h.response({
      status: 'success',
      data: {
        book: bookDetail,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Edit book by ID hnadler
const editBookById = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!bookId) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const index = booksData.findIndex((book) => book.id === bookId);

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  const updatedAt = new Date().toISOString();
  const finished = checkFinished(pageCount, readPage);

  booksData[index] = {
    // insert old data like (insertedAt)
    ...booksData[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt,
  };

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  response.code(200);
  return response;
};

// Delete book by ID handler
const deleteBookById = (request, h) => {
  const { bookId } = request.params;

  if (!bookId) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menghapus buku. Id tidak ditemukan',
    });
    response.code(400);
    return response;
  }

  const bookIndex = booksData.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    booksData.splice(bookIndex, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBook,
  getManyBooks,
  getBookById,
  editBookById,
  deleteBookById,
};
