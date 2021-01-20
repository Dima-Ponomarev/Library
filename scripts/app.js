let myLibrary = []

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