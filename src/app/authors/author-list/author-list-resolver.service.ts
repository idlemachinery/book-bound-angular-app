import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthorListResolved } from '../../shared/interfaces';
import { AuthorService } from '../author.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorListResolver implements Resolve<AuthorListResolved> {

  constructor(private dataService: AuthorService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<AuthorListResolved> {
    return this.dataService.getAll()
      .pipe(
        map(authors => ({ authors })),
        catchError(error => {
          const message = `Retrieval error: ${error.message}`;
          console.error(error);
          return of({authors: null, error: message });
        })
      );
  }
}
