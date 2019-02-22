import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthorRoutingModule } from './author-routing.module';

@NgModule({
  imports: [AuthorRoutingModule, SharedModule],
  declarations: [AuthorRoutingModule.components]
})
export class AuthorModule { }
