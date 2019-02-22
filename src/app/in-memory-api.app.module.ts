import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { InMemoryApiService } from './in-memory-api.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryApiService),
    CoreModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    AppRoutingModule.components
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
