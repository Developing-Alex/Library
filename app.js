const addBookBtn = document.getElementById('new-book-btn');
const newBookForm = document.getElementById('new-book');
const cardContainer = document.getElementById('card-container');
const dialogModal = document.querySelector('dialog');
let cardId = 0;
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
  cardId ++
  //loops through array, creates cards and content elements for each index of the array//
  arrOfObjs.forEach(element => {
    const card = document.createElement("table");
    card.setAttribute('id', cardId - 1);
    card.setAttribute('class', 'card');
    cardContainer.appendChild(card);
    const cardHeader = document.createElement("thead");
    card.appendChild(cardHeader);
    const cardTitle = document.createElement("h3");
    cardTitle.setAttribute('class', 'card-title');
    cardHeader.appendChild(cardTitle);
    const cardContent = document.createElement("tbody");
    cardContent.setAttribute('class', 'card-content');
    card.appendChild(cardContent);
    const cardAuthor = document.createElement("td");
    cardContent.appendChild(cardAuthor);
    const cardYear = document.createElement("td");
    cardContent.appendChild(cardYear);
    const cardRead = document.createElement("td");
    cardContent.appendChild(cardRead);
    const removeBook = document.createElement("button");
    removeBook.setAttribute('value', cardId - 1);
    removeBook.setAttribute('class', 'remove-book');
    console.log(parseInt(removeBook.value))
    card.appendChild(removeBook);

    //fills cards with content//
    cardTitle.innerText = `"${element.title}"`;
    cardAuthor.innerText = `By: ${element.author}`;
    cardYear.innerText = `Published: ${element.year}`;
    cardRead.innerText = `Have you read this? ${element.read}`;
    removeBook.innerText = 'Remove';

    removeBook.addEventListener('mousedown', () => {
      removeBook.style.transform = "scale(0.98)";
    });

    removeBook.addEventListener("click", () => {
      for(let i = 0; i < myLibrary.length; i ++){
        console.log(myLibrary.indexOf(i))
        if(myLibrary.indexOf(i) + 1 === parseInt(removeBook.value)){
          console.log(`array index is ${myLibrary[i]} and button value is ${removeBook.value}`);
          cardContainer.removeChild(card)
          //remove book card at particular id from display
          //remove book from array
        }
      }
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
    };

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
--Wire up remove book button and add click event to remove book
--Add button to change read status on cards
-- style form
--Fix any other bugs that may pop up
    1.Return checkbox to unchecked on new book form after form completion
*/
