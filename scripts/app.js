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


function renderBook(book, root, position){
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
    bookRead.addEventListener('click', (e) => toggleReadStatusHandler(e));
    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.appendChild(bookRead);
    card.setAttribute('data-position', position)
    const deleteBtn = document.createElement('div');
    deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>'
    deleteBtn.className = 'delete-btn';


    deleteBtn.addEventListener('click', (e) => deleteBookHandler(e));
    
    card.appendChild(deleteBtn);

    root.appendChild(card);
}

function addBookToLibrary(title, author, pageNum, bookRead, library){
    library.push(new Book(title, author, pageNum, bookRead));
    renderBook(library[library.length - 1], mainContent, library.length - 1);
}



function renderLibrary(library, root){
    library.forEach((book, index) => {
        renderBook(book, root, index);
    });
}

function deleteBookHandler(e){
    e.target.parentElement.remove();
    const targetPosition = parseInt(e.target.parentElement.dataset.position);
    myLibrary.splice(targetPosition, 1);
    if(targetPosition < myLibrary.length ){
        const library = document.querySelectorAll('.book-card');
        for(let i = targetPosition; i < myLibrary.length; i++){
            library[i].dataset.position = i;
        }
    }
}

function toggleReadStatusHandler(e){
    if(e.target.classList.contains('book-read')){
        e.target.textContent = 'Book is not read';
        e.target.className = 'completion book-not-read';
        myLibrary[parseInt(e.target.parentElement.dataset.position)].bookRead = false;
    } else{
        e.target.textContent = 'Book is read';
        e.target.className = 'completion book-read';
        myLibrary[parseInt(e.target.parentElement.dataset.position)].bookRead = true;
    }
}

function togglePopupHandler(){
    const newBookPopup = document.querySelector('.new-book-popup');
    newBookPopup.classList.toggle('active');
    const newBookForm = document.querySelector('.new-book-form');
    newBookForm.classList.toggle('active');
}

function submitNewBookHandler(){
    if (formAuthor.value && formTitle.value && formNumPages.value){
        addBookToLibrary(formTitle.value ,formAuthor.value, formNumPages.value, formRead.checked, myLibrary)
        formTitle.value = '';
        formAuthor.value = '';
        formNumPages.value = '';
        formRead.checked = false;
        togglePopup();
    }
}

//------------------Event Listeners-------------------//

addBookBtn.addEventListener('click', togglePopupHandler);

closeFormBtn.addEventListener('click', togglePopupHandler);

submitNewBookBtn.addEventListener('click', submitNewBookHandler);




addBookToLibrary('Harry Potter', 'J.K. Roling', 500, true, myLibrary);
addBookToLibrary('Harry Potter', 'J.K. Roling', 500, false, myLibrary);
addBookToLibrary('Harry Potter', 'J.K. Roling', 500, false, myLibrary);
addBookToLibrary('Harry Pottefaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaar', 'J.K. Roling', 500, false, myLibrary);


//renderLibrary(myLibrary, mainContent)