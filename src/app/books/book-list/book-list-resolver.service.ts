import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BookListResolved } from '../../shared/interfaces';
import { BookService } from '../book.service';

@Injectable({
  providedIn: 'root'
})
export class BookListResolver implements Resolve<BookListResolved> {

  constructor(private dataService: BookService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<BookListResolved> {
    return this.dataService.getAll()
      .pipe(
        map(books => ({ books })),
        catchError(error => {
          const message = `Retrieval error: ${error.message}`;
          console.error(error);
          return of({books: null, error: message });
        })
      );
  }
}
