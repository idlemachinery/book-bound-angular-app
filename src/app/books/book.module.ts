import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BookRoutingModule } from './book-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookEditComponent } from './book-edit/book-edit.component';

@NgModule({
  imports: [BookRoutingModule, SharedModule],
  declarations: [BookRoutingModule.components, BookListComponent, BookEditComponent]
})
export class BookModule { }
