import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  FormlyFormOptions,
  FormlyModule,
} from '@ngx-formly/core';
import { StaticService } from 'app/constants/services/static.service';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IB2kJsonSchema, B2kFieldConfig } from 'app/constants/services/static.service';

@Component({
  selector: 'app-config-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    PanelModule,
    ButtonModule,
    ChartModule,
    MessagesModule,
    ProgressSpinnerModule
  ],
  templateUrl: './config-admin.component.html',
  styleUrl: './config-admin.component.sass',
})
export class ConfigAdminComponent {
  errors: Message[] = [];
  form: FormGroup<any> = new FormGroup({});
  jsonSchema$!: Observable<IB2kJsonSchema>;
  fields$?: Observable<B2kFieldConfig[]>;
  staticService = inject(StaticService);
  model: any = {mac: '12-34-56-78-90-12', sport: 1, team: 1, player: 2};
  options: FormlyFormOptions = { formState: {userId: 0}};
  readonly initFields: B2kFieldConfig[] = [];
  readonly initModel: any = {};

  submit() {
    console.log(this.model);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.options.formState = {userId: 1}
    this.jsonSchema$ = this.staticService.getJsonSchema('user-form').pipe(
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
        return data.fields ?? [];
      }),
    );
  }

  data2: any;

  chart_options: any;
  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data2 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          type: 'line',
          label: 'Dataset 1',
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: [50, 25, 12, 48, 56, 76, 42],
        },
        {
          type: 'bar',
          label: 'Dataset 2',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: [21, 84, 24, 75, 37, 65, 34],
          borderColor: 'white',
          borderWidth: 2,
        },
        {
          type: 'bar',
          label: 'Dataset 3',
          backgroundColor: documentStyle.getPropertyValue('--orange-500'),
          data: [41, 52, 24, 74, 23, 21, 32],
        },
      ],
    };

    this.chart_options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
  }
}
