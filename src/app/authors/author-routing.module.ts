import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorEditComponent } from './author-edit/author-edit.component';
import { AuthorResolver } from './author-edit/author-resolver.service';
import { AuthorCanDeactivateGuard } from './author-edit/author-can-deactivate.guard';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorListResolver } from './author-list/author-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: AuthorListComponent,
    resolve: { resolvedData: AuthorListResolver }
  },
  {
    path: ':id',
    component: AuthorEditComponent,
    resolve: { resolvedData: AuthorResolver },
    canDeactivate: [AuthorCanDeactivateGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthorCanDeactivateGuard]
})
export class AuthorRoutingModule {
  static components = [AuthorEditComponent, AuthorListComponent];
}
