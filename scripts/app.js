let myLibrary = []
const mainContent = document.querySelector('.main');

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

function addBookToLibrary(title, author, pageNum, bookRead, library){
    library.push(new Book(title, author, pageNum, bookRead));
}

function renderLibrary(library, root){
    library.forEach(book => {
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
    });
    
}

addBookToLibrary('Harry Potter', 'J.K. Roling', 500, true, myLibrary);
addBookToLibrary('Harry Potter', 'J.K. Roling', 500, false, myLibrary);

renderLibrary(myLibrary, mainContent)