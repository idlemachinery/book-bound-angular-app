import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IdleModule } from 'ng-idle-common';
import { IdleFormsModule, IdleReactiveFormsModule } from 'ng-idle-forms';

import { SortableHeaderDirective } from './directives/sortable-header.directive';

@NgModule({
  imports: [
    CommonModule,
    IdleModule,
    IdleFormsModule,
    IdleReactiveFormsModule,
    NgbModule
  ],
  exports: [
    CommonModule,
    IdleModule,
    IdleFormsModule,
    IdleReactiveFormsModule,
    NgbModule,
    SortableHeaderDirective
  ],
  declarations: [SortableHeaderDirective]
})
export class SharedModule { }
