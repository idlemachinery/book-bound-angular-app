import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bb-modal-confirm-delete',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Delete?</h4>
      <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete?</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-danger"
              (click)="modal.close()">Yes (Delete)</button>
      <button class="btn btn-outline-secondary"
              (click)="modal.dismiss('no click')"
              ngbAutofocus>No</button>
    </div>
  `
})
export class ModalConfirmDeleteComponent {
  constructor(public modal: NgbActiveModal) {}
}

@Component({
  selector: 'bb-modal-lose-changes',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Lose Unsaved Changes?</h4>
      <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>You have unsaved changes! Would you like to leave the page and lose them?</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-danger"
              (click)="modal.close()">Leave</button>
      <button class="btn btn-outline-secondary"
              (click)="modal.dismiss('cancel click')"
              ngbAutofocus>Cancel</button>
    </div>
  `
})
export class ModalLoseChangesComponent {
  constructor(public modal: NgbActiveModal) {}
}

export const MODALS = {
  confirmDelete: ModalConfirmDeleteComponent,
  loseChanges: ModalLoseChangesComponent
};
