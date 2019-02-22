import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { ValidationForm } from 'ng-idle-forms';
import * as _ from 'lodash';

import { Constants } from 'src/app/shared/constants';
import { Book, Author, BookResolved } from '../../shared/interfaces';
import { BookService } from '../book.service';
import { AuthorService } from 'src/app/authors/author.service';

@Component({
  templateUrl: './book-edit.component.html'
})
export class BookEditComponent extends ValidationForm implements OnInit {
  private saving = false;
  private pageTitle = 'Edit';
  private errorMessage: string;
  private originalBook: Book;
  private book: Book;
  private authors: Author[] = [];
  get isDirty(): boolean {
    return this.form.dirty;
  }
  get cover() {
    return this.form.get('coverImage');
  }

  constructor(
    private fb: FormBuilder,
    private dataService: BookService,
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
    // setup the validation messages
    this.validationMessages = {
      title: {
        required: 'Title is required',
        minlength: 'Title must be at least three characters',
        maxlength: 'Title cannot exceed 100 characters'
      },
      author: {
        required: 'Author is required',
        minlength: 'Author must be at least three characters',
        maxlength: 'Author cannot exceed 50 characters'
      },
      genre: {
        required: 'Genre is required',
        maxlength: 'Genre cannot exceed 50 characters'
      },
      description: {
        maxlength: 'Description cannot exceed 1000 characters'
      },
      coverImage: {
        pattern: 'Must be a png or jpg'
      }
    };
  }

  ngOnInit() {
    // client side author cache
    this.authorService.getAll().subscribe(data => this.authors = data);

    // build the form
    this.form = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      author: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      genre: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      description: ['', [,
        Validators.maxLength(1000)
      ]],
      coverImage: ['', [,
        Validators.pattern('.*\/.*.(png|jpg|jpeg)')
      ]],
      goodreadsId: [null],
      read: [false]
    });

    // retrieve the resolved data
    this.route.data.forEach((data) => {
      const resolvedData: BookResolved = data[Constants.routeResolvedData];
      this.errorMessage = resolvedData.error;
      if (resolvedData.book) {
        this.onBookRetrieved(resolvedData.book);
      }
    });
  }

  onBookRetrieved(book: Book): void {
    // Reset back to pristine
    this.form.reset();

    // Use a copy to allow cancel.
    this.originalBook = book;
    this.book = Object.assign({}, book);

    if (this.book.id === 0) {
        this.pageTitle = 'Add';
    } else {
        this.pageTitle = `Edit`;
    }

    // Display the data in the form
    this.form.patchValue({
      title: this.book.title,
      author: this.book.author,
      genre: this.book.genre,
      description: this.book.description,
      coverImage: this.book.coverImage,
      goodreadsId: this.book.goodreadsId,
      read: this.book.read,
    });
  }

  // client side filter
  authorsSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? [] :
        this.authors.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  onSelectAuthor(event: NgbTypeaheadSelectItemEvent): void {
    event.preventDefault();
    this.form.patchValue({author: event.item.name});
  }

  authorsFormatter = (result: Author) => result.name;

  // server side filtering
  // authorsSearch = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  ////     tap(() => this.loading = true)
  //     switchMap(term => this.authorService.search(term)),
  //     // map object to string
  //     map(authors => _.map(authors, 'name'))
  ////     tap(() => this.loading = false)
  //   )

  save(): void {
    if (this.form.valid) {
      this.saving = true;
      const b = { ...this.book, ...this.form.value };
      this.dataService.saveBook(b).subscribe(() => {
        // Assign the changes from the copy
        Object.keys(this.book).forEach(key =>
            this.originalBook[key] = this.book[key]
        );
        this.form.reset(this.form.value);
        this.router.navigate(['/books']);
      }, (error: any) => {
          this.errorMessage = error.message || JSON.stringify(error);
          this.saving = false;
      }, () => this.saving = false);
    } else {
        this.errorMessage = 'Please correct the validation errors.';
    }
  }
}
