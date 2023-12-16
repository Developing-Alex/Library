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

    //fills cards with content//
    cardTitle.innerText = `"${element.title}"`;
    cardAuthor.innerText = `By: ${element.author}`;
    cardYear.innerText = `Published: ${element.year}`;
    cardRead.innerText = `Have you read this? ${element.read}`;

    //styles cards//
    card.style.border = "3px solid black";
    card.style.backgroundColor = "whitesmoke"
    card.style.borderRadius = "5px";
    card.style.marginTop = '15px';
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";
    card.style.width = "270px"
    card.style.height = "300px"
    card.style.padding = "10px"
    cardTitle.style.marginTop = "0";
    cardTitle.style.fontSize = "1.5rem"
    cardContent.style.display = "flex";
    cardContent.style.flexDirection = "column";
    cardContent.style.alignItems = "flex-start";
    cardContent.style.justifyContent = "center";
    cardContent.style.gap = "10px";
    cardContent.style.fontSize = "1.2rem"
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
    if(i === 1){
      console.log(i)
      displayBook(myLibrary);
    }else if(i === 2){
      let shifted = myLibrary.shift();
      console.log(i)
      displayBook(myLibrary);
      myLibrary.unshift(shifted);
      console.log(myLibrary)
    }else{
      console.log(i)
      copyMyLibrary = myLibrary.slice(i -1);
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
--Remove last last enetered book as child from card container so duplicates dont arise//May have to use a click counter to achieve
-- style form
--Style 
--Fix any other bugs that may pop up
*/
