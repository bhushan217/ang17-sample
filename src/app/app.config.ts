import {
  ApplicationConfig,
  ErrorHandler,
  enableProdMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptor } from './constants/services/auth.interceptor.service';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyDatepickerModule } from '@ngx-formly/primeng/datepicker';

import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { GlobalHttpErrorHandler } from './global-http-error-handler.interceptor';
import { NotifiableErrorHandler } from './notifiable-error-handler.service';
import { MessagesModule } from 'primeng/messages';
import { environment } from '../environments/environment';
import { MessageService } from 'primeng/api';
import { PanelWrapperComponent } from './shared/components/formly/panel-wrapper/panel-wrapper.component';


import { ArrayTypeComponent } from './shared/components/formly/types/array.type';
import { ObjectTypeComponent } from './shared/components/formly/types/object.type';
import { MultiSchemaTypeComponent } from './shared/components/formly/types/multischema.type';
import { NullTypeComponent } from './shared/components/formly/types/null.type';

export function minItemsValidationMessage(error: any, field: FormlyFieldConfig) {
  return `should NOT have fewer than ${field.props?.['minItems']} items`;
}

export function maxItemsValidationMessage(error: any, field: FormlyFieldConfig) {
  return `should NOT have more than ${field.props?.['maxItems']} items`;
}

export function minLengthValidationMessage(error: any, field: FormlyFieldConfig) {
  return `should NOT be shorter than ${field.props?.['minLength']} characters`;
}

export function maxLengthValidationMessage(error: any, field: FormlyFieldConfig) {
  return `should NOT be longer than ${field.props?.['maxLength']} characters`;
}

export function minValidationMessage(error: any, field: FormlyFieldConfig) {
  return `should be >= ${field.props?.['min']}`;
}

export function maxValidationMessage(error: any, field: FormlyFieldConfig) {
  return `should be <= ${field.props?.['max']}`;
}

export function multipleOfValidationMessage(error: any, field: FormlyFieldConfig) {
  return `should be multiple of ${field.props?.['step']}`;
}

export function exclusiveMinimumValidationMessage(error: any, field: FormlyFieldConfig) {
  return `should be > ${field.props?.['step']}`;
}

export function exclusiveMaximumValidationMessage(error: any, field: FormlyFieldConfig) {
  return `should be < ${field.props?.['step']}`;
}

export function constValidationMessage(error: any, field: FormlyFieldConfig) {
  return `should be equal to constant "${field.props?.['const']}"`;
}

export function typeValidationMessage({ schemaType }: any) {
  return `should be "${schemaType[0]}".`;
}

if (environment.production) {
  enableProdMode();
}
export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes),
    // importProvidersFrom(BrowserAnimationsModule.withConfig({})),
    provideNoopAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      FormlyPrimeNGModule,
      FormlyDatepickerModule,
      FormlyModule.forRoot({        
      validationMessages: [{ name: 'required', message: 'This field is required' }],
      types:[
        { name: 'null', component: NullTypeComponent, wrappers: ['form-field'] },
        { name: 'array', component: ArrayTypeComponent },
        { name: 'object', component: ObjectTypeComponent },
        { name: 'multischema', component: MultiSchemaTypeComponent },
      ],
      wrappers: [
        {name: "panel", component: PanelWrapperComponent},
      ]
      }),
      MessagesModule
    ),
    // importProvidersFrom(MessagesModule),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MessageService,
    {
      provide: ErrorHandler,
      useClass: NotifiableErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpErrorHandler,
      multi: true,
    },
  ],
};
