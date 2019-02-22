import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Third party imports
import { NgbDateAdapter, NgbTimeAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EnsureModuleLoadedOnceGuard } from 'ng-idle-common';
import { IdleHttpModule, AddHeaderInterceptor } from 'ng-idle-http';

import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FooterComponent } from './footer/footer.component';
import { ModalConfirmDeleteComponent, ModalLoseChangesComponent } from './modals/modals.component';

@NgModule({
  imports: [CommonModule, RouterModule, IdleHttpModule, NgbModule],
  declarations: [NavMenuComponent, FooterComponent, ModalConfirmDeleteComponent, ModalLoseChangesComponent],
  exports: [IdleHttpModule, NavMenuComponent, FooterComponent],
  entryComponents: [ModalConfirmDeleteComponent, ModalLoseChangesComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
    }
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  // Ensure that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
