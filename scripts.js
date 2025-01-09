document.addEventListener('DOMContentLoaded', () => {
  loadSampleBooks();
  loadSampleMembers();
  loadSampleTransactions();
  loadBooks();
  loadMembers();
  loadTransactions();
  applyDarkMode();
});

function loadSampleBooks() {
  const books = [
      { cover: 'https://m.media-amazon.com/images/I/91GjOmU7z1L._AC_UF1000,1000_QL80_.jpg', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction' },
      { cover: 'https://m.media-amazon.com/images/M/MV5BZTlkYWU4MGEtZmQyYi00OWEzLTgzY2EtYzVjOTEzYzAyNTk1XkEyXkFqcGc@._V1_.jpg', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction' },
      { cover: 'https://miro.medium.com/v2/resize:fit:800/1*g8s4n-puPV3y-F2b7ilJ_A.jpeg', title: '1984', author: 'George Orwell', genre: 'Dystopian' }
  ];

  books.forEach(book => addBookToTable(book));
}

function loadSampleMembers() {
  const members = [
      { name: 'John Doe', email: 'john@example.com', membershipDate: '2023-01-01' },
      { name: 'Jane Smith', email: 'jane@example.com', membershipDate: '2023-02-01' },
      { name: 'Alice Johnson', email: 'alice@example.com', membershipDate: '2023-03-01' }
  ];

  members.forEach(member => addMemberToTable(member));
}

function loadSampleTransactions() {
  const transactions = [
      { book: 'The Great Gatsby', member: 'John Doe', dateBorrowed: '2023-01-01', dateReturned: '2023-01-10' },
      { book: 'To Kill a Mockingbird', member: 'Jane Smith', dateBorrowed: '2023-02-01', dateReturned: '2023-02-10' },
      { book: '1984', member: 'Alice Johnson', dateBorrowed: '2023-03-01', dateReturned: '2023-03-10' }
  ];

  transactions.forEach(transaction => addTransactionToTable(transaction));
}

function loadBooks() {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  books.forEach(book => addBookToTable(book));
}

function saveBooks(books) {
  localStorage.setItem('books', JSON.stringify(books));
}

function loadMembers() {
  const members = JSON.parse(localStorage.getItem('members')) || [];
  members.forEach(member => addMemberToTable(member));
}

function saveMembers(members) {
  localStorage.setItem('members', JSON.stringify(members));
}

function loadTransactions() {
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  transactions.forEach(transaction => addTransactionToTable(transaction));
}

function saveTransactions(transactions) {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addBookToTable(book) {
  const table = document.querySelector('#books tbody');
  const row = document.createElement('tr');

  row.innerHTML = `
      <td><img src="${book.cover}" alt="${book.title}" width="150"></td>
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

function updateBookInTable(updatedBook) {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const index = books.findIndex(book => book.title === updatedBook.title);
  if (index !== -1) {
      books[index] = updatedBook;
      saveBooks(books);
      const table = document.querySelector('#books tbody');
      table.innerHTML = '';
      books.forEach(book => addBookToTable(book));
  }
}

function addBook() {
  const title = prompt('Enter book title:');
  const author = prompt('Enter book author:');
  const genre = prompt('Enter book genre:');
  const cover = prompt('Enter book cover image URL:');

  if (title && author && genre && cover) {
      const book = { title, author, genre, cover };
      const books = JSON.parse(localStorage.getItem('books')) || [];
      books.push(book);
      saveBooks(books);
      addBookToTable(book);
  }
}

function editBook(button) {
  const row = button.parentElement.parentElement;
  const title = row.cells[1].innerText;
  const author = row.cells[2].innerText;
  const genre = row.cells[3].innerText;
  const cover = row.cells[0].querySelector('img').src;

  const newTitle = prompt('Edit book title:', title);
  const newAuthor = prompt('Edit book author:', author);
  const newGenre = prompt('Edit book genre:', genre);
  const newCover = prompt('Edit book cover image URL:', cover);

  if (newTitle && newAuthor && newGenre && newCover) {
      const updatedBook = { title: newTitle, author: newAuthor, genre: newGenre, cover: newCover };
      updateBookInTable(updatedBook);
  }
}

function deleteBook(button) {
  const row = button.parentElement.parentElement;
  const title = row.cells[1].innerText;
  let books = JSON.parse(localStorage.getItem('books')) || [];
  books = books.filter(book => book.title !== title);
  saveBooks(books);
  row.remove();
}

function addTransactionToTable(transaction) {
  const table = document.querySelector('#transactions tbody');
  const row = document.createElement('tr');

  const dateBorrowed = new Date(transaction.dateBorrowed);
  const dateReturned = new Date(transaction.dateReturned);
  const lateFee = Math.max(0, Math.ceil((dateReturned - dateBorrowed) / (1000 * 60 * 60 * 24)) - 7) * 2;

  const action = dateReturned ? 'Returned' : 'Issued';

  row.innerHTML = `
      <td>${transaction.book}</td>
      <td>${transaction.member}</td>
      <td>${transaction.dateBorrowed}</td>
      <td>${transaction.dateReturned}</td>
      <td>${lateFee}</td>
      <td>${action}</td>
      <td>
          <button onclick="editTransaction(this)">Edit</button>
          <button onclick="deleteTransaction(this)">Delete</button>
      </td>
  `;

  table.appendChild(row);
}

function addTransaction() {
  const book = prompt('Enter book title:');
  const member = prompt('Enter member name:');
  const dateBorrowed = prompt('Enter date borrowed (YYYY-MM-DD):');
  const dateReturned = prompt('Enter date returned (YYYY-MM-DD):');

  if (book && member && dateBorrowed && dateReturned) {
      const transaction = { book, member, dateBorrowed, dateReturned };
      const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
      transactions.push(transaction);
      saveTransactions(transactions);
      addTransactionToTable(transaction);
  }
}

function editTransaction(button) {
  const row = button.parentElement.parentElement;
  const book = row.cells[0].innerText;
  const member = row.cells[1].innerText;
  const dateBorrowed = row.cells[2].innerText;
  const dateReturned = row.cells[3].innerText;

  const newBook = prompt('Edit book title:', book);
  const newMember = prompt('Edit member name:', member);
  const newDateBorrowed = prompt('Edit date borrowed (YYYY-MM-DD):', dateBorrowed);
  const newDateReturned = prompt('Edit date returned (YYYY-MM-DD):', dateReturned);

  if (newBook && newMember && newDateBorrowed && newDateReturned) {
      const updatedTransaction = { book: newBook, member: newMember, dateBorrowed: newDateBorrowed, dateReturned: newDateReturned };
      const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
      const index = transactions.findIndex(transaction => transaction.book === book && transaction.member === member);
      if (index !== -1) {
          transactions[index] = updatedTransaction;
          saveTransactions(transactions);
          const table = document.querySelector('#transactions tbody');
          table.innerHTML = '';
          transactions.forEach(transaction => addTransactionToTable(transaction));
      }
  }
}

function deleteTransaction(button) {
  const row = button.parentElement.parentElement;
  const book = row.cells[0].innerText;
  const member = row.cells[1].innerText;
  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  transactions = transactions.filter(transaction => transaction.book !== book || transaction.member !== member);
  saveTransactions(transactions);
  row.remove();
}

function addMember() {
  const name = prompt('Enter member name:');
  const email = prompt('Enter member email:');
  const membershipDate = prompt('Enter membership date (YYYY-MM-DD):');

  if (name && email && membershipDate) {
      const member = { name, email, membershipDate };
      const members = JSON.parse(localStorage.getItem('members')) || [];
      members.push(member);
      saveMembers(members);
      addMemberToTable(member);
  }
}

function editMember(button) {
  const row = button.parentElement.parentElement;
  const name = row.cells[0].innerText;
  const email = row.cells[1].innerText;
  const membershipDate = row.cells[2].innerText;

  const newName = prompt('Edit member name:', name);
  const newEmail = prompt('Edit member email:', email);
  const newMembershipDate = prompt('Edit membership date (YYYY-MM-DD):', membershipDate);

  if (newName && newEmail && newMembershipDate) {
      const updatedMember = { name: newName, email: newEmail, membershipDate: newMembershipDate };
      const members = JSON.parse(localStorage.getItem('members')) || [];
      const index = members.findIndex(member => member.email === email);
      if (index !== -1) {
          members[index] = updatedMember;
          saveMembers(members);
          const table = document.querySelector('#members tbody');
          table.innerHTML = '';
          members.forEach(member => addMemberToTable(member));
      }
  }
}

function deleteMember(button) {
  const row = button.parentElement.parentElement;
  const email = row.cells[1].innerText;
  let members = JSON.parse(localStorage.getItem('members')) || [];
  members = members.filter(member => member.email !== email);
  saveMembers(members);
  row.remove();
}

function addMemberToTable(member) {
  const table = document.querySelector('#members tbody');
  const row = document.createElement('tr');

  row.innerHTML = `
      <td>${member.name}</td>
      <td>${member.email}</td>
      <td>${member.membershipDate}</td>
      <td>
          <button onclick="editMember(this)">Edit</button>
          <button onclick="deleteMember(this)">Delete</button>
      </td>
  `;

  table.appendChild(row);
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

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function applyDarkMode() {
  const darkMode = JSON.parse(localStorage.getItem('darkMode'));
  if (darkMode) {
      document.body.classList.add('dark-mode');
  }
}

function signIn() {
  alert('Sign In functionality to be implemented');
}