import { Component } from '@angular/core';
import { FieldWrapper, FormlyModule } from '@ngx-formly/core';

@Component({
  selector: 'b2k-panel-wrapper',
  standalone: true,
  imports: [FormlyModule],
  template: `
  <div class="card">
    <h3 class="card-header">{{ props.label }}</h3>
    <div class="card-body">
      <ng-container #fieldComponent></ng-container>
    </div>
  </div>
  `,
  styles: ``,
})
export class PanelWrapperComponent extends FieldWrapper {}
