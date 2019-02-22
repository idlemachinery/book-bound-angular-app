import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BookResolved } from '../../shared/interfaces';
import { BookService } from '../book.service';

@Injectable({
  providedIn: 'root'
})
export class BookResolver implements Resolve<BookResolved> {

  constructor(private dataService: BookService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<BookResolved> {
    let id = route.paramMap.get('id');
    if (id === 'new') {
      id = '0';
    } else if (isNaN(+id)) {
      const message = `Book id was not a number: ${id}`;
      console.log(message);
      return of({ book: null, error: message });
    }
    return this.dataService.getBook(+id)
    .pipe(
      map(book => ({ book })),
      catchError(error => {
        const message = `Retrieval error: ${error.message}`;
        console.error(error);
        return of({ book: null, error: message });
      })
    );
  }
}
