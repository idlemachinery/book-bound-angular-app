import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookEditComponent } from './book-edit/book-edit.component';
import { BookResolver } from './book-edit/book-resolver.service';
import { BookCanDeactivateGuard } from './book-edit/book-can-deactivate.guard';
import { BookListComponent } from './book-list/book-list.component';
import { BookListResolver } from './book-list/book-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: BookListComponent,
    resolve: { resolvedData: BookListResolver }
  },
  {
    path: ':id',
    component: BookEditComponent,
    resolve: { resolvedData: BookResolver },
    canDeactivate: [BookCanDeactivateGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BookCanDeactivateGuard]
})
export class BookRoutingModule {
  static components = [BookEditComponent, BookListComponent];
}
