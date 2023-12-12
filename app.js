const myLibrary = [
  /*{
    title: "Invisible Man",
    author: "Ralph Ellison",
    year: 1952,
    read: true,
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
    year: 1999,
    read: true,
  }*/
];

/*const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const read = document.getElementById('read').value;
    const newBook = new Book(title, author, year, read);
    myLibrary.push(newBook);
  });*/

function Book(title, author, year, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.read = read;
}

Book.prototype.info = function(){
  return `${this.title} by ${this.author}, published in ${this.year} and ${this.read}.`
  console.log(this.info);
}

function addBookToLibrary(obj) {
  
  myLibrary.push(obj)
};

addBookToLibrary(new Book('call', 'me', '1245', 'I have yet to read'))

console.log(myLibrary)



function displayBook(arrOfObjs) {
  for (let i = 0; i < arrOfObjs.length; i++) {

  }
}
