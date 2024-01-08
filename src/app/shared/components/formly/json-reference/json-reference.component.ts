import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { B2kFieldConfig, IB2kJsonSchema } from 'app/constants/services/static.service';
import { StaticService } from 'app/constants/services/static.service';
import { Message } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { tap, catchError, of, map, Observable } from 'rxjs';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';

@Component({
  selector: 'app-json-reference',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    PanelModule,
    ButtonModule,
    MessagesModule,
    ProgressSpinnerModule],
  template: `
@if( fields$ | async; as fields2){
  @if(fields2.length){
  <p-panel subheader="Enter user details">
    <p-header class="text-3xl text-900 text-center mb-1"> User Form</p-header>
    <form [formGroup]="form" autocomplete="off">
      <formly-form [model]="model" [fields]="fields2" [options]="options" [form]="form"></formly-form>
    </form>
    <div class="flex w-full gap-2 p-4">
        <p-button label="Save" icon="pi pi-check" (onClick)="submit()" [disabled]="form.invalid"></p-button>
        <p-button label="Cancel" icon="pi pi-times" styleClass="p-button-secondary"></p-button>
    </div>
  </p-panel>
  }@else {    
  <p-messages [enableService]="false" [(value)]="errors"></p-messages>
  }
} @else {
  <p-progressSpinner aria-label="Loading"></p-progressSpinner>
  <p-messages [enableService]="false" [(value)]="errors"></p-messages>
}
  `,
  styles: ``
})
export class JsonReferenceComponent implements OnInit {
submit() {
throw new Error('Method not implemented.');
}
  errors: Message[] = [];
  form: FormGroup<any> = new FormGroup({});
  jsonSchema$!: Observable<IB2kJsonSchema>;
  fields$?: Observable<B2kFieldConfig[]>;
  
  formlyJsonschema = inject(FormlyJsonschema);
  staticService = inject(StaticService);
  model: any = {mac: '12-34-56-78-90-12', sport: 1, team: 1, player: 2};
  options: FormlyFormOptions = { formState: {userId: 0}};
  readonly initFields: B2kFieldConfig[] = [];
  readonly initModel: any = {};
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.options.formState = {userId: 1}
    this.jsonSchema$ = this.staticService.getJsonSchema('reference').pipe(
      tap({
        error: (error: Error) => {
          this.errors.push({
            severity: 'error',
            closable: true,
            summary: 'Error: ' + error.name,
            detail: error.message
          } as Message);
          console.log(
            `Update component's 'error' property showing the error banner`
          );
        },
      }),
      catchError((_err) => {
        console.log(`Replacing the failed observable with an empty array`);
        return of({ fields: this.initFields });
      })
    );
    this.fields$ = this.jsonSchema$.pipe(
      map((data: IB2kJsonSchema) => {
        console.log('Data transformation...');
        this.options.formState.selectOptionsData = data.options ;
        return [this.formlyJsonschema.toFieldConfig(data.schema)] ?? [];
      }),
    );
  }

}
