let myLibrary = []
const mainContent = document.querySelector('.main');
const closeFormBtn = document.querySelector('.close-form-btn');
const addBookBtn = document.querySelector('.add-book-btn');
const submitNewBookBtn = document.querySelector('.submit-button');
const formTitle = document.getElementById('ftitle');
const formAuthor = document.getElementById('fauthor');
const formNumPages = document.getElementById('fpagenum');
const formRead = document.getElementById('fread');

function Book(title, author, pageNum, bookRead){
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.bookRead = bookRead;
}

Book.prototype.info = function() {
    if (this.bookRead){
        return `${this.title} by ${this.author}, ${this.pageNum} pages, book is read`;
    } else {
        return `${this.title} by ${this.author}, ${this.pageNum} pages, not read yet`;
    }
}

//------------------Functions-------------------//

function renderBook(book, root){
    const card = document.createElement('div');
    card.className = "book-card";
    const bookTitle = document.createElement('h2');
    bookTitle.textContent = book.title;
    bookTitle.className = 'title';
    const bookAuthor = document.createElement('h3');
    bookAuthor.textContent = book.author;
    bookAuthor.className = 'author';
    const bookPages = document.createElement('div');
    bookPages.textContent = `Number of pages: ${book.pageNum}`;
    bookPages.className = 'pages';
    const bookRead = document.createElement('div');
    if (book.bookRead){
        bookRead.textContent = 'Book is read';
        bookRead.className = 'completion book-read';
    } else {
        bookRead.textContent = 'Book is not read';
        bookRead.className = 'completion book-not-read';
    }
    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.appendChild(bookRead);

    root.appendChild(card);
}

function addBookToLibrary(title, author, pageNum, bookRead, library){
    library.push(new Book(title, author, pageNum, bookRead));
    renderBook(library[library.length - 1], mainContent)
}



function renderLibrary(library, root){
    console.log('library is rendered');
    library.forEach(book => {
        renderBook(book, root);
    });
}

function togglePopup(){

}

function addBookHandler(){
    const newBookPopup = document.querySelector('.new-book-popup');
    newBookPopup.classList.toggle('active');
    const newBookForm = document.querySelector('.new-book-form');
    newBookForm.classList.toggle('active');
};

function closeFormHandler(){
    const newBookPopup = document.querySelector('.new-book-popup');
    newBookPopup.classList.toggle('active');
    const newBookForm = document.querySelector('.new-book-form');
    newBookForm.classList.toggle('active');
};

function submitNewBookHandler(){
    console.log(formAuthor.value, formTitle.value, formNumPages.value, formRead.checked);
    if (formAuthor.value && formTitle.value && formNumPages.value){
        addBookToLibrary(formTitle.value ,formAuthor.value, formNumPages.value, formRead.checked, myLibrary)
        formTitle.value = '';
        formAuthor.value = '';
        formNumPages.value = '';
        formRead.checked = false;
        closeFormBtn.click();
    }
}

//------------------Event Listeners-------------------//

addBookBtn.addEventListener('click', addBookHandler);

closeFormBtn.addEventListener('click', closeFormHandler);

submitNewBookBtn.addEventListener('click', submitNewBookHandler);




addBookToLibrary('Harry Potter', 'J.K. Roling', 500, true, myLibrary);
addBookToLibrary('Harry Potter', 'J.K. Roling', 500, false, myLibrary);
addBookToLibrary('Harry Potter', 'J.K. Roling', 500, false, myLibrary);


//renderLibrary(myLibrary, mainContent)