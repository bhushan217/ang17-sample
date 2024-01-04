import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCanDisable]',
  standalone: true
})
export class CanDisableDirective {

  @Input()
  @HostBinding('class.disabled')
  disabled = false;

  protected get nativeDisabled(): '' | null {
    return this.disabled ? '' : null;
  }

}
