import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GenericDataService } from 'ng-idle-http';

import { Author } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthorService extends GenericDataService<Author> {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
    this.apiUrl = 'api/authors';
  }

  saveAuthor(author: Author): Observable<Author> {
    if (author.id === 0) {
      author.id = null;
      return this.create(author);
    }
    return this.update(author, author.id);
  }

  getAuthor(id: number): Observable<Author> {
    if (id === 0) {
      return of(this.initializeAuthor());
    }
    return this.get(id);
  }

  initializeAuthor(): Author {
    return {
      id: 0,
      name: ''
    };
  }

  // server side filtering
  search(searchTerm: string): Observable<Author[]> {
    const url = `${this.apiUrl}?q=${searchTerm}`;
    return this.httpClient.get<Author[]>(url);
  }
}
