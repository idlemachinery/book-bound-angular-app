import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthorResolved } from '../../shared/interfaces';
import { AuthorService } from '../author.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorResolver implements Resolve<AuthorResolved> {

  constructor(private dataService: AuthorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AuthorResolved> {
    let id = route.paramMap.get('id');
    if (id === 'new') {
      id = '0';
    } else if (isNaN(+id)) {
      const message = `Author id was not a number: ${id}`;
      console.log(message);
      return of({ author: null, error: message });
    }
    return this.dataService.getAuthor(+id)
    .pipe(
      map(author => ({ author })),
      catchError(error => {
        const message = `Retrieval error: ${error.message}`;
        console.error(error);
        return of({ author: null, error: message });
      })
    );
  }
}
