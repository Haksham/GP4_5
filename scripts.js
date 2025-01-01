document.addEventListener('DOMContentLoaded', () => {
  loadSampleBooks();
});

function loadSampleBooks() {
  const books = [
      { cover: 'images/book1.jpg', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction' },
      { cover: 'images/book2.jpg', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction' },
      { cover: 'images/book3.jpg', title: '1984', author: 'George Orwell', genre: 'Dystopian' }
  ];

  books.forEach(book => addBookToTable(book));
}

function loadSampleTransactions() {
  const transactions = [
      { book: 'The Great Gatsby', member: 'John Doe', dateBorrowed: '2023-01-01', dateReturned: '2023-01-10' },
      { book: 'To Kill a Mockingbird', member: 'Jane Smith', dateBorrowed: '2023-02-01', dateReturned: '2023-02-10' }
  ];

  transactions.forEach(transaction => addTransactionToTable(transaction));
}

function addBook() {
  const title = prompt('Enter book title:');
  const author = prompt('Enter book author:');
  const genre = prompt('Enter book genre:');
  const cover = prompt('Enter book cover image URL:');

  if (title && author && genre && cover) {
      const book = { cover, title, author, genre };
      addBookToTable(book);
  }
}

function addBookToTable(book) {
  const table = document.querySelector('#books tbody');
  const row = document.createElement('tr');

  row.innerHTML = `
      <td><img src="${book.cover}" alt="${book.title}" width="50"></td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.genre}</td>
      <td>
          <button onclick="editBook(this)">Edit</button>
          <button onclick="deleteBook(this)">Delete</button>
      </td>
  `;

  table.appendChild(row);
}

function editBook(button) {
  const row = button.parentElement.parentElement;
  const title = prompt('Edit book title:', row.cells[1].innerText);
  const author = prompt('Edit book author:', row.cells[2].innerText);
  const genre = prompt('Edit book genre:', row.cells[3].innerText);
  const cover = prompt('Edit book cover image URL:', row.cells[0].querySelector('img').src);

  if (title && author && genre && cover) {
      row.cells[0].querySelector('img').src = cover;
      row.cells[0].querySelector('img').alt = title;
      row.cells[1].innerText = title;
      row.cells[2].innerText = author;
      row.cells[3].innerText = genre;
  }
}

function deleteBook(button) {
  const row = button.parentElement.parentElement;
  row.remove();
}

function addTransaction() {
  const book = prompt('Enter book title:');
  const member = prompt('Enter member name:');
  const dateBorrowed = prompt('Enter date borrowed (YYYY-MM-DD):');
  const dateReturned = prompt('Enter date returned (YYYY-MM-DD):');

  if (book && member && dateBorrowed && dateReturned) {
      const transaction = { book, member, dateBorrowed, dateReturned };
      addTransactionToTable(transaction);
  }
}

function addTransactionToTable(transaction) {
  const table = document.querySelector('#transactions tbody');
  const row = document.createElement('tr');

  row.innerHTML = `
      <td>${transaction.book}</td>
      <td>${transaction.member}</td>
      <td>${transaction.dateBorrowed}</td>
      <td>${transaction.dateReturned}</td>
      <td>
          <button onclick="editTransaction(this)">Edit</button>
          <button onclick="deleteTransaction(this)">Delete</button>
      </td>
  `;

  table.appendChild(row);
}

function editTransaction(button) {
  const row = button.parentElement.parentElement;
  const book = prompt('Edit book title:', row.cells[0].innerText);
  const member = prompt('Edit member name:', row.cells[1].innerText);
  const dateBorrowed = prompt('Edit date borrowed (YYYY-MM-DD):', row.cells[2].innerText);
  const dateReturned = prompt('Edit date returned (YYYY-MM-DD):', row.cells[3].innerText);

  if (book && member && dateBorrowed && dateReturned) {
      row.cells[0].innerText = book;
      row.cells[1].innerText = member;
      row.cells[2].innerText = dateBorrowed;
      row.cells[3].innerText = dateReturned;
  }
}

function deleteTransaction(button) {
  const row = button.parentElement.parentElement;
  row.remove();
}

function addMember() {
  alert('Add Member functionality to be implemented');
}

