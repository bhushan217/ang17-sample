import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FieldType, FormlyModule } from '@ngx-formly/core';
@Component({
  selector: 'formly-object-type',
  standalone:true,
  imports:[CommonModule, FormlyModule],
  template: `
    <div class="mb-3">
      <legend *ngIf="props.label">{{ props.label }}</legend>
      <p *ngIf="props.description">{{ props.description }}</p>
      <div
        class="alert alert-danger"
        role="alert"
        *ngIf="showError && formControl.errors"
      >
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
      <formly-field
        *ngFor="let f of field.fieldGroup"
        [field]="f"
      ></formly-field>
    </div>
  `,
  styles: [
    `
    :host
      formly-field 
        border-left: 1px solid var(--bd-color-h)
        border-bottom: 1px solid var(--bd-color-h)
        display: block
        padding-left: .5rem

    `
  ]
})
export class ObjectTypeComponent extends FieldType {}
