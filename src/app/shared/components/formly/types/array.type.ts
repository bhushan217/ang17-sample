import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FieldArrayType, FormlyModule } from '@ngx-formly/core';
@Component({
  selector: 'formly-array-type',
  standalone:true,
  imports:[CommonModule, FormlyModule],
  template: `
    <div class="mb-3">
      <legend *ngIf="props.label">{{ props.label }}</legend>
      <p *ngIf="props.description">{{ props.description }}</p>
      <div class="d-flex flex-row-reverse">
        <button class="btn btn-primary icon pointer" type="button" (click)="add()" title="Add #{{(field.fieldGroup?.length || 0 )+1}} ">+</button>
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
        class="row align-items-start"
      >
        <formly-field class="col" [field]="field"></formly-field>
        <div *ngIf="field.props?.['removable'] !== false" class="col-2 text-right icon remove">
          <button class="btn btn-danger" type="button" (click)="remove(i)" title="Remove #{{i+1}} ">
            -
          </button>
        </div>
      </div>
    </div>
  `,
  styles:[
    `
    .align-items-start
      border-bottom: 1px solid var(--bd-color)
      .icon.remove
        border-bottom: 1px solid var(--bd-color-h)
        
    `
  ]
})
export class ArrayTypeComponent extends FieldArrayType {}
