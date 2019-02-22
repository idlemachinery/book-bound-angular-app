import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

import { SortableHeaderDirective, SortEvent, compare } from '../../shared/directives/sortable-header.directive';
import { Constants } from 'src/app/shared/constants';
import { Author, AuthorListResolved } from '../../shared/interfaces';
import { AuthorService } from '../author.service';
import { MODALS } from 'src/app/core/modals/modals.component';

@Component({
  templateUrl: './author-list.component.html'
})
export class AuthorListComponent implements OnInit {
  private errorMessage = '';
  private authorsSorted: Author[] = [];
  private authorsOrig: Author[] = [];
  private totals = {};
  private collectionSize = 0;
  private pageSize = 5;
  private page = 1;
  @ViewChildren(SortableHeaderDirective) private headers: QueryList<SortableHeaderDirective>;
  get authors(): Author[] {
    return this.authorsSorted
      .map((author, i) => ({id: i + 1, ...author}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  constructor(
    private dataService: AuthorService,
    private route: ActivatedRoute,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    const resolvedData: AuthorListResolved =
      this.route.snapshot.data[Constants.routeResolvedData];
    this.errorMessage = resolvedData.error;
    if (resolvedData.authors) {
      this.authorsOrig = resolvedData.authors;
      this.refresh();
    }
  }

  refresh() {
    this.authorsSorted = this.authorsOrig;
    this.collectionSize = this.authorsSorted.length;
  }

  delete(id: number) {
    const options: NgbModalOptions = { size: 'sm', centered: true };
    this.modal.open(MODALS.confirmDelete, options).result.then(result => {
      this.dataService.delete(id).subscribe(data => {
        _.remove(this.authorsOrig, { id });
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

    // sorting authors
    if (direction === '') {
      this.authorsSorted = this.authorsOrig;
    } else {
      this.authorsSorted = [...this.authorsOrig].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
