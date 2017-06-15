import Client from './Utility';
import Config from './config';
// import fs from 'fs'
export default class BookClient {
  static getBooksByTitle(title, cb) {
    Client._fetch(`${Config.serverIP}get/booksByTitle?title=${title}`, 'GET', null, cb);
  }
  static getStoredListBooks(cb) {
    Client._fetch(`${Config.serverIP}get/storedListBooks`, 'GET', null, cb);
  }
  static getStoredBooks(cb) {
    Client._fetch(`${Config.serverIP}get/storedBooks`, 'GET', null, cb);
  }
  static getHistoricalBooks(cb) {
    Client._fetch(`${Config.serverIP}get/historicalBooks`, 'GET', null, cb);
  }
  static getInterestedBooks(cb) {
    Client._fetch(`${Config.serverIP}get/interestedBooks`, 'GET', null, cb);
  }
  static getFollowEntries(cb) {
    Client._fetch(`${Config.serverIP}get/interestedBooksAndPosts`, 'GET', null, cb);
  }
  static getRecommendedBooks(cb) {
    Client._fetch(`${Config.serverIP}get/recommendedBooks`, 'GET', null, cb);
  }
  static getRecommendedEntries(cb) {
    Client._fetch(`${Config.serverIP}get/recommendedEntries`, 'GET', null, cb);
  }
  static getBooksByUser(userID, cb) {
    Client._fetch(`${Config.serverIP}get/booksByUser?userID=${userID}`, 'GET', null, cb);
  }
  static getEntriesByUser(userID, cb) {
    Client._fetch(`${Config.serverIP}get/booksAndPostsByUser?userID=${userID}`, 'GET', null, cb);
  }
  static getBookByID(bookID, cb) {
    Client._fetch(`${Config.serverIP}get/bookByID?bookID=${bookID}`, 'GET', null, cb);
  }
  static getBookSection(sectionID, cb) {
    Client._fetch(`${Config.serverIP}get/bookSection?sectionID=${sectionID}`, 'GET', null, cb);
  }
  static getBookComments(bookID, sectionNum, pageNum, cb, amount = 0, times = 0) {
    Client._fetch(`${Config.serverIP}get/bookComments?bookID=${bookID}&sectionNum=${sectionNum}&pageNum=${pageNum}&amount=${amount}&times=${times}`, 'GET', null, cb);
  }
  static getBookSectionByNum(bookID, sectionNum, cb) {
    Client._fetch(`${Config.serverIP}get/bookSection?bookID=${bookID}&num=${sectionNum}`, 'GET', null, cb);
  }

  static postBook(book, cb) {
    const formData = new FormData();
    console.log(book);
    formData.append('title', book.title);
    formData.append('type', book.type);
    formData.append('description', book.description);
    formData.append('cover', book.cover);
    console.log(book.cover.size);
    Client._fetch2(`${Config.serverIP}post/book`, 'POST', formData, cb);
  }


  static postBookComment(bookID, sectionNum, pageNum, content, cb) {
    Client._fetch(`${Config.serverIP}post/bookComment`, 'POST', JSON.stringify({
      bookID,
      sectionNum,
      pageNum,
      content,
    }), cb);
  }

  static postBookSection(bookID, title, cb) {
    Client._fetch(`${Config.serverIP}post/bookSection`, 'POST', JSON.stringify({
      bookID,
      title,
    }), cb);
  }

  static putBook(book, cb) {
    Client._fetch(`${Config.serverIP}put/book`, 'POST', JSON.stringify({
      bookID: book._id,
      title: book.title,
      type: book.type,
      description: book.description,
    }), cb);
  }

  static putBookSection(section, cb) {
    Client._fetch(`${Config.serverIP}put/bookSection`, 'POST', JSON.stringify({
      sectionID: section.sectionID,
      title: section.title,
      content: section.content,
    }), cb);
  }

  static putShareBook(bookID, cb) {
    Client._fetch(`${Config.serverIP}put/shareBook`, 'POST', JSON.stringify({
      bookID,
    }), cb);
  }

  static putLikeBook(bookID, cb) {
    Client._fetch(`${Config.serverIP}put/likeBook`, 'POST', JSON.stringify({
      bookID,
    }), cb);
  }
  static putCancelLikeBook(bookID, cb) {
    Client._fetch(`${Config.serverIP}put/cancelLikeBook`, 'POST', JSON.stringify({
      bookID,
    }), cb);
  }

  static putStoreBook(bookID, cb) {
    Client._fetch(`${Config.serverIP}put/storeBook`, 'POST', JSON.stringify({
      bookID,
    }), cb);
  }
  static putCancelStoreBook(bookID, cb) {
    Client._fetch(`${Config.serverIP}put/cancelStoreBook`, 'POST', JSON.stringify({
      bookID,
    }), cb);
  }
  static putStoredList(bookIDs, cb) {
    Client._fetch(`${Config.serverIP}put/storedList`, 'POST', JSON.stringify({
      bookIDs,
    }), cb);
  }

  static deleteBook(bookID, cb) {
    Client._fetch(`${Config.serverIP}delete/book`, 'POST', JSON.stringify({
      bookID,
    }), cb);
  }

  static deleteBookSection(sectionID, cb) {
    Client._fetch(`${Config.serverIP}delete/bookSection`, 'POST', JSON.stringify({
      sectionID,
    }), cb);
  }
}
