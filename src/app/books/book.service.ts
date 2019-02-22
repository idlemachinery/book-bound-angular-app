import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GenericDataService } from 'ng-idle-http';

import { Book } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BookService extends GenericDataService<Book> {

  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = 'api/books';
  }

  saveBook(book: Book): Observable<Book> {
    if (book.id === 0) {
      book.id = null;
      return this.create(book);
    }
    return this.update(book, book.id);
  }

  getBook(id: number): Observable<Book> {
    if (id === 0) {
      return of(this.initializeBook());
    }
    return this.get(id);
  }

  initializeBook(): Book {
    return {
      id: 0,
      title: '',
      genre: '',
      author: '',
      goodreadsId: null,
      description: null,
      coverImage: null,
      read: false
    };
  }
}
