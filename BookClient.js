import Client from './Utility'
import Config from './config'
//import fs from 'fs'
export default class BookClient {
    static getBooksDefault(cb) {
        Client._fetch(Config.serverIP + "get/booksDefault", "GET", null, cb);
    }
    static getBooksByTitle(title, cb) {
        Client._fetch(Config.serverIP + "get/booksByTitle?title=" + title, "GET", null, cb);
    }

    static getBooksByUser(userID, cb) {
        Client._fetch(Config.serverIP + "get/booksByUser?userID=" + userID, "GET", null, cb);
    }

    static getBook(bookID, cb) {
        Client._fetch(Config.serverIP + "get/books?bookID=" + bookID, "GET", null, cb);
    }

    static getBookContent(bookID, num, cb) {
        Client._fetch(Config.serverIP + "get/books?bookID=" + bookID + "&num=" + num, "GET", null, cb);
    }

    static postBook(book, cb) {
       
        const formData = new FormData();
        console.log(book);
        formData.append("title", book.title);
        formData.append("type", book.type);
        formData.append("description", book.description);
        formData.append("cover", book.cover);
        console.log(book.cover.size);
        Client._fetch2(Config.serverIP + "post/book", "POST", formData, cb);

    }

    static postImage(image, cb) {
        Client._fetch(Config.serverIP + "post/image", "POST", image, cb);
    }

    static postBookComment(bookID, comment, cb) {
        Client._fetch(Config.serverIP + "post/bookComment", "POST", JSON.stringify({
            bookID : bookID,
            comment: comment
        }), cb);
    }
 
    static postBookContent(bookID, contentTitle, cb) {
        Client._fetch(Config.serverIP + "post/bookContent", "POST", JSON.stringify({
            bookID : bookID,
            contentTitle: contentTitle
        }), cb);
    }

    static putBook(book, cb) {
        Client._fetch(Config.serverIP + "put/book", "POST", JSON.stringify({
            bookID : book._id,
            title: book.title,
            type: book.type,
            description: book.description
        }), cb);
    }

    static putBookContent(content, cb) {
        Client._fetch(Config.serverIP + "put/bookContent", "POST", JSON.stringify({
            contentID : content._id,
            title: content.title,
            content: content.data
        }), cb);
    }

   static deleteBook(bookID, cb) {
        Client._fetch(Config.serverIP + "delete/book", "POST", JSON.stringify({
            bookID: bookID
        }), cb);
    }

    static deleteBookContent(contentID, cb) {
         Client._fetch(Config.serverIP + "delete/bookContent", "POST", JSON.stringify({
            contentID: contentID
        }), cb);
    }
}


