import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

import { SortableHeaderDirective, SortEvent, compare } from '../../shared/directives/sortable-header.directive';
import { Constants } from 'src/app/shared/constants';
import { Book, BookListResolved } from '../../shared/interfaces';
import { BookService } from '../book.service';
import { MODALS } from 'src/app/core/modals/modals.component';

@Component({
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
  private errorMessage = '';
  private booksSorted: Book[] = [];
  private booksOrig: Book[] = [];
  private totals = {};
  private collectionSize = 0;
  private pageSize = 5;
  private page = 1;
  @ViewChildren(SortableHeaderDirective) private headers: QueryList<SortableHeaderDirective>;
  get books(): Book[] {
    return this.booksSorted
      .map((book, i) => ({id: i + 1, ...book}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  constructor(
    private dataService: BookService,
    private route: ActivatedRoute,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    const resolvedData: BookListResolved =
      this.route.snapshot.data[Constants.routeResolvedData];
    this.errorMessage = resolvedData.error;
    if (resolvedData.books) {
      this.booksOrig = resolvedData.books;
      this.refresh();
    }
  }

  refresh() {
    this.booksSorted = this.booksOrig;
    this.collectionSize = this.booksSorted.length;
  }

  delete(id: number) {
    const options: NgbModalOptions = { size: 'sm', centered: true };
    this.modal.open(MODALS.confirmDelete, options).result.then(result => {
      this.dataService.delete(id).subscribe(data => {
        _.remove(this.booksOrig, { id });
        this.refresh();
      });
    }, reason => console.log(`Dismissed: ${reason}`));
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting books
    if (direction === '') {
      this.booksSorted = this.booksOrig;
    } else {
      this.booksSorted = [...this.booksOrig].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
