import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FieldArrayType, FormlyModule } from '@ngx-formly/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'formly-array-type',
  standalone: true,
  imports: [CommonModule, FormlyModule, ConfirmDialogModule],
  providers:[ConfirmationService],
  template: `
    <div class="formly-array">
      <legend *ngIf="props.label">{{ props.label }}</legend>
      <p *ngIf="props.description">{{ props.description }}</p>
      <div class="formly-array-action">
        <button
          class="btn btn-primary icon pointer pi pi-plus"
          type="button"
          (click)="add()"
          title="Add #{{ (field.fieldGroup?.length || 0) + 1 }} "
        ></button>
      </div>
      <div
        class="alert alert-danger"
        role="alert"
        *ngIf="showError && formControl.errors"
      >
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
      <div
        *ngFor="let field of field.fieldGroup; let i = index"
        class="row align-items-start {{i%2===0?'even':'odd'}}"
      >
        <div
          *ngIf="field.props?.['removable'] !== false"
          class="col-2 text-right icon remove"
        >
          <button
            class="btn btn-danger icon pointer pi pi-trash"
            type="button"
            (click)="removeConfirm($event, i)"
            title="Remove #{{ i + 1 }} "
          ></button>
        </div>
        <formly-field class="form-field col" [field]="field"></formly-field>
      </div>      
    <p-confirmDialog></p-confirmDialog>
    </div>
  `,
  styles: [
    `
    .formly-array
      .formly-array-action
        .btn
          margin-left: -.5rem
      .row
        flex-flow: column
        margin-top: 0.5rem
        border-top: 1px solid var(--bd-color)
        .remove
          display: flex
          flex-flow: row
          justify-content: flex-end
        &.odd
          background-color: var(--bg-color-h)
        &.even
          background-color: var(--bg-color)
      .formly-field
        border-left-color: transparent

    `,
  ],
})
export class ArrayTypeComponent extends FieldArrayType {
  confirmationService = inject(ConfirmationService)
  removeConfirm(event:Event, index: number){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
          this.remove(index)
          console.debug({acceptedDelete: index, id: this.id})
      },
      reject: () => {
        console.debug({rejectedDelete: index, id: this.id})
      }
    })
  }
}
