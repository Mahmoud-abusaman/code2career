class LibraryItem {
    #id;
    #name;
    #language;
    #available;

    constructor(id, name, language, available = true) {
        this.#id = id
        this.#name = name;
        this.#language = language
        this.#available = available
    }

    isAvailable() {
        return this.#available;
    }
    toggleisAvailable() {
        this.#available = !this.#available;
    }

    toString() {
        return `item with id =${this.#id} with name ${this.#name} with language:${this.#language} ${(this.#available) ? " is available" : "is not available"}`;
    }
}


class Book extends LibraryItem {
    #author;
    #isRead
    constructor(id, name, language, available = true, author, isRead) {
        super(id, name, language, available = true);
        this.#author = author;
        this.#isRead = isRead;
    }
    getIsRead() {
        return this.#isRead;
    }
    togglereadStatus() {
        this.#isRead = !this.#isRead;
    }
    toString() {
        return `${super.toString()}  issued by author: ${this.#author}`
    }
}


let book = new Book(1, "first book", "arabic", true, "mahmoud", false)
console.log(`${book}`);  
