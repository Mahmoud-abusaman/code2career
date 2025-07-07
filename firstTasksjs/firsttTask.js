let LetralBook = {
    title: "litral book",
    author: "mahmoud",
    isRead: false,
    toggleReadStatus() { this.isRead = (!this.isRead) },
    describe() {
        return `title: ${this.title} by author ${this.author}`
    }
}
LetralBook.toggleReadStatus();
console.log(LetralBook.describe());
// #############################################################


function factoryBook(title, author, isread = false) {
    const book = {}
    book.title = title;
    book.author = author;
    book.isRead = isread;
    book.toggleReadStatus = function () { this.isRead = (!this.isRead) }
    book.describe = function () {
        return `title: ${this.title} by author ${this.author}`
    }
    return book;
}

let book1 = factoryBook("factory book", "mahmoud");
book1.toggleReadStatus();
console.log(book1.describe());

// #############################################################
function constructorBook(title, author, isRead = false) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
}
constructorBook.prototype.toggleReadStatus = function () { this.isRead = (!this.isRead) }
constructorBook.prototype.describe = function () {
    return `title: ${this.title} by author ${this.author}`
}

let book2 = new constructorBook("constructor book", "me");
book2.toggleReadStatus()
console.log(book2.describe());

// #############################################################



class BookClass {
    constructor(title, author, isRead = false) {
        this.title = title;
        this.author = author;
        this.isRead = isRead;
    }
    toggleReadStatus() { this.isRead = (!this.isRead) };
    describe() {
        return `title: ${this.title} by author ${this.author}`
    }
}

let book3 = new BookClass("class book", "me");
book3.toggleReadStatus()
console.log(book3.describe());
