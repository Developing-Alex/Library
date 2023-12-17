const addBookBtn = document.getElementById('new-book-btn');
const newBookForm = document.getElementById('new-book');
const cardContainer = document.getElementById('card-container');
const dialogModal = document.querySelector('dialog');
let i = 0;

const myLibrary = [];
let copyMyLibrary = [];

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

//This function renders books from an array to displayable cards on the UI//
function displayBook(arrOfObjs) {

  //loops through array, creates cards and content elements for each index of the array//
  arrOfObjs.forEach(element => {
    const card = document.createElement("table");
    cardContainer.appendChild(card);
    const cardHeader = document.createElement("thead");
    card.appendChild(cardHeader);
    const cardTitle = document.createElement("h3");
    cardHeader.appendChild(cardTitle);
    const cardContent = document.createElement("tbody")
    card.appendChild(cardContent);
    const cardAuthor = document.createElement("td");
    cardContent.appendChild(cardAuthor);
    const cardYear = document.createElement("td");
    cardContent.appendChild(cardYear);
    const cardRead = document.createElement("td");
    cardContent.appendChild(cardRead);
    const removeBook = document.createElement("button");
    card.appendChild(removeBook);

    //fills cards with content//
    cardTitle.innerText = `"${element.title}"`;
    cardAuthor.innerText = `By: ${element.author}`;
    cardYear.innerText = `Published: ${element.year}`;
    cardRead.innerText = `Have you read this? ${element.read}`;
    removeBook.innerText = 'Remove';

    //styles cards//
    card.style.boxShadow = "0px 8px 15px rgba(0, 0, 0, 0.1)";
    card.style.backgroundColor = "rgb(250, 250, 255)"
    card.style.borderRadius = "40px";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";
    card.style.width = "270px"
    card.style.height = "300px"
    card.style.padding = "20px"
    cardTitle.style.marginTop = "0";
    cardTitle.style.fontSize = "1.5rem"
    cardContent.style.display = "flex";
    cardContent.style.flexDirection = "column";
    cardContent.style.alignItems = "flex-start";
    cardContent.style.justifyContent = "center";
    cardContent.style.gap = "10px";
    cardContent.style.fontSize = "1.2rem"
    removeBook.style.width = '140px';
    removeBook.style.height = "45px";
    removeBook.style.backgroundColor = "rgb(44, 81, 174)";
    removeBook.style.color = "whitesmoke";
    removeBook.style.fontSize = "1rem";
    removeBook.style.fontWeight = "bold";
    removeBook.style.borderRadius = "45px";
    removeBook.style.marginTop = "40px";
    removeBook.style.border = "none";
    removeBook.style.cursor = "pointer";
    removeBook.style.boxShadow = "0px 8px 15px rgba(0, 0, 0, 0.1)"
    removeBook.addEventListener('mousedown', () => {
      removeBook.style.transform = "scale(0.98)";
    })
  });
}

//When clicked, a dialog box pops up to allow user input, it also hides the add book button//
addBookBtn.addEventListener('click', () => {
  dialogModal.showModal();
  addBookBtn.style.display = "none";
});

//Takes user input from html form, creates Book objects using said data and pushes objects to myLibrary array//
function inputNewBook() {
  newBookForm.addEventListener('submit', (event) => {

    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const read = document.getElementById('read');

    const readIt = 'Yes';
    const didntReadIt = 'No';
    if (read.checked) {
      addBookToLibrary(new Book(title, author, year, readIt));
    } else {
      addBookToLibrary(new Book(title, author, year, didntReadIt));
    }

    //Allows cards to be created without duplicates being made
    i++;
    if (i === 1) {
      displayBook(myLibrary);
    } else if (i === 2) {
      let shifted = myLibrary.shift();
      displayBook(myLibrary);
      myLibrary.unshift(shifted);
      console.log(myLibrary)
    } else {
      copyMyLibrary = myLibrary.slice(i - 1);
      displayBook(copyMyLibrary);
    }
  });

  //Hides newBookForm and resets inputs//
  newBookForm.addEventListener('submit', () => {
    title.value = '';
    author.value = '';
    year.value = '';
    read.value = '';
    dialogModal.close();
    addBookBtn.style.display = "block";
  })
};

inputNewBook();
/*
**TO DO**
--Add remove book button
--Add button to change read status on cards
-- style form
--Style 
--Fix any other bugs that may pop up
    1.Return checkbox to unchecked on new book form after form completion
*/
