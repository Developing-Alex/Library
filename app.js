const myLibrary = [
  /*{
    title: "Invisible Man",
    author: "Ralph Ellison",
    year: 1952,
    read: 'I have read this.'
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
    year: 1999,
    read: 'I have read this.'
  },
  {
    title: "The Heaven & Earth Grocery Store",
    author: "James McBride",
    year: 2023,
    read: 'I have yet to read this.'
  }*/
];

function Book(title, author, year, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, published in ${this.year} and ${this.read}.`
  console.log(this.info);
}

//This take user input and stores new book objects into an array//
function addBookToLibrary(newBook) {
  myLibrary.push(newBook)
};

console.log(myLibrary)

const cardContainer = document.getElementById('card-container');

//This function renders books from myLibrary to card containers in the display//
function displayBook(arrOfObjs) {

  arrOfObjs.forEach(element => {
    const card = document.createElement("div");
    cardContainer.appendChild(card);
    const cardTitle = document.createElement("h3");
    card.appendChild(cardTitle);
    const cardAuthor = document.createElement("p");
    card.appendChild(cardAuthor);
    const cardYear = document.createElement("p");
    card.appendChild(cardYear);
    const cardRead = document.createElement("p");
    card.appendChild(cardRead);
    cardTitle.innerText = element.title;
    cardAuthor.innerText = element.author;
    cardYear.innerText = element.year;
    cardRead.innerText = element.read;
    card.style.border = "thin solid black";
    card.style.paddingLeft = '15px';
  });
}

const newBookBtn = document.getElementById('new-book-btn');
const newBookForm = document.getElementById('new-book');

//button that changes newBookForm display from none to block//
newBookBtn.addEventListener('click', () => {
  newBookForm.style.display = 'block';
});

//Takes user input from html form and creates Book objects to display//
function submitNewBook(){
  newBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;
  const read = document.getElementById('read').value;
  const newBook = new Book(title, author, year, read);
  myLibrary.push(newBook);
  displayBook(myLibrary);
});
//Hides newBookForm and resets inputs//
  newBookForm.addEventListener('submit', () => {
    title.value = '';
    author.value = '';
    year.value = '';
    read.value = '';
    newBookForm.style.display = 'none';
  })
}

submitNewBook();
