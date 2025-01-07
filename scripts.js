// Function to calculate late fee
function calculateLateFee(dateBorrowed, dateReturned) {
  const borrowedDate = new Date(dateBorrowed);
  const returnedDate = new Date(dateReturned);

  // Calculate the difference in months between the two dates
  const monthsOverdue = Math.max(0, (returnedDate.getFullYear() - borrowedDate.getFullYear()) * 12 + returnedDate.getMonth() - borrowedDate.getMonth());

  // Calculate the late fee (5 rupees per month)
  return monthsOverdue * 5;
}

// Example of applying it in a transaction
function addTransaction() {
  const book = prompt('Enter book title:');
  const member = prompt('Enter member name:');
  const dateBorrowed = prompt('Enter date borrowed (YYYY-MM-DD):');
  const dateReturned = prompt('Enter date returned (YYYY-MM-DD):');

  if (book && member && dateBorrowed && dateReturned) {
    const lateFee = calculateLateFee(dateBorrowed, dateReturned);
    const transaction = { book, member, dateBorrowed, dateReturned, lateFee };
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
      <td>${transaction.lateFee} rupees</td>
      <td>
          <button onclick="editTransaction(this)">Edit</button>
          <button onclick="deleteTransaction(this)">Delete</button>
      </td>
  `;

  table.appendChild(row);
}

// Edit transaction function (if needed)
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
      const lateFee = calculateLateFee(dateBorrowed, dateReturned);
      row.cells[4].innerText = `${lateFee} rupees`;
  }
}

// Delete transaction function
function deleteTransaction(button) {
  const row = button.parentElement.parentElement;
  row.remove();
}

document.addEventListener('DOMContentLoaded', () => {
  loadSampleBooks();
  loadSampleTransactions();
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

function searchBooks() {
  const input = document.getElementById('searchBook');
  const filter = input.value.toLowerCase();
  const table = document.querySelector('#books tbody');
  const rows = table.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
      const title = rows[i].getElementsByTagName('td')[1].innerText.toLowerCase();
      if (title.includes(filter)) {
          rows[i].style.display = '';
      } else {
          rows[i].style.display = 'none';
      }
  }
}
