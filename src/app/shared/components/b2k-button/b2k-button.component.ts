import { Component } from '@angular/core';

@Component({
  selector: 'app-b2k-button',
  standalone: true,
  imports: [],
  template: `
    <button (click)="onClick($event)">{{label}}<ng-content></ng-content></button>
  `,
  styles: [
    `

    `
  ]
})
export class B2kButtonComponent {


}
