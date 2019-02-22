import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { ValidationForm } from 'ng-idle-forms';

import { Constants } from 'src/app/shared/constants';
import { Author, AuthorResolved } from '../../shared/interfaces';
import { AuthorService } from '../author.service';

@Component({
  templateUrl: './author-edit.component.html'
})
export class AuthorEditComponent extends ValidationForm implements OnInit {
  private saving = false;
  private pageTitle = 'Edit';
  private errorMessage: string;
  private originalAuthor: Author;
  private author: Author;
  get isDirty(): boolean {
    return this.form.dirty;
  }

  constructor(
    private fb: FormBuilder,
    private dataService: AuthorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
    this.validationMessages = {
      name: {
        required: 'Name is required',
        minlength: 'Name must be at least three characters',
        maxlength: 'Name cannot exceed 50 characters'
      }
    };
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]]
    });

    this.route.data.forEach((data) => {
      const resolvedData: AuthorResolved = data[Constants.routeResolvedData];
      this.errorMessage = resolvedData.error;
      if (resolvedData.author) {
        this.form.reset();
        this.originalAuthor = resolvedData.author;
        this.author = Object.assign({}, resolvedData.author);

        if (this.author.id === 0) {
            this.pageTitle = 'Add';
        } else {
            this.pageTitle = `Edit`;
        }

        this.form.patchValue({
          name: this.author.name
        });
      }
    });
  }

  save(): void {
    if (this.form.valid) {
      this.saving = true;
      const a = { ...this.author, ...this.form.value };
      this.dataService.saveAuthor(a).subscribe(() => {
        Object.keys(this.author).forEach(key => this.originalAuthor[key] = this.author[key]);
        this.form.reset(this.form.value);
        this.router.navigate(['/authors']);
      }, (error: any) => {
          this.errorMessage = error.message || JSON.stringify(error);
          this.saving = false;
      }, () => this.saving = false);
    } else {
        this.errorMessage = 'Please correct the validation errors.';
    }
  }
}
