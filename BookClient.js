import Client from './Utility'
import Config from './config'
//import fs from 'fs'
export default class BookClient {
    static getBooksByTitle(title, cb) {
        Client._fetch(Config.serverIP + "get/booksByTitle?title=" + title, "GET", null, cb);
    }

    static getInterestedBooks(cb) {
        Client._fetch(Config.serverIP + "get/interestedBooks", "GET", null, cb);
    }
    static getRecommendedBooks(cb) {
        Client._fetch(Config.serverIP + "get/recommendedBooks", "GET", null, cb);
    }
    
    static getBooksByUser(userID, cb) {
        Client._fetch(Config.serverIP + "get/booksByUser?userID=" + userID, "GET", null, cb);
    }

    static getBookSection(sectionID, cb) {
        Client._fetch(Config.serverIP + "get/bookSection?sectionID=" + sectionID, "GET", null, cb);
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


    static postBookComment(bookID, comment, cb) {
        Client._fetch(Config.serverIP + "post/bookComment", "POST", JSON.stringify({
            bookID : bookID,
            comment: comment
        }), cb);
    }
 
    static postBookSection(bookID, title, cb) {
        Client._fetch(Config.serverIP + "post/bookSection", "POST", JSON.stringify({
            bookID : bookID,
            title: title
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

    static putBookSection(section, cb) {
        Client._fetch(Config.serverIP + "put/bookSection", "POST", JSON.stringify({
            sectionID : section.sectionID,
            title: section.title,
            content: section.content
        }), cb);
    }

    static putLikeBook(bookID, cb) {
        Client._fetch(Config.serverIP + "put/likeBook", "POST", JSON.stringify({
            bookID : bookID
        }), cb);
    }
    static putCancelLikeBook(bookID, cb) {
        Client._fetch(Config.serverIP + "put/cancelLikeBook", "POST", JSON.stringify({
            bookID : bookID
        }), cb);
    }

    static putStoreBook(bookID, cb) {
        Client._fetch(Config.serverIP + "put/storeBook", "POST", JSON.stringify({
            bookID : bookID
        }), cb);
    }
    static putCancelStoreBook(bookID, cb) {
        Client._fetch(Config.serverIP + "put/cancelStoreBook", "POST", JSON.stringify({
            bookID : bookID
        }), cb);
    }
    
    static deleteBook(bookID, cb) {
        Client._fetch(Config.serverIP + "delete/book", "POST", JSON.stringify({
            bookID: bookID
        }), cb);
    }

    static deleteBookSection(sectionID, cb) {
         Client._fetch(Config.serverIP + "delete/bookSection", "POST", JSON.stringify({
            sectionID: sectionID
        }), cb);
    }
}


