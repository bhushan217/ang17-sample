import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormlyFieldConfig, FormlyFieldProps } from "@ngx-formly/core";
import { Observable, catchError, shareReplay, take, throwError } from "rxjs";


export type B2kFieldConfig = FormlyFieldConfig<
  FormlyFieldProps & { [extraProps: string]: any; }
>;
export interface IB2kJsonSchema {
  schema?: any;
  model?: any;
  options?: any[];
  fields?: B2kFieldConfig[];
}

@Injectable({
  providedIn: 'root',
})
export class StaticService {
  SERVICE_NAME = 'Static Service'
  constructor(public httpClient: HttpClient) {}

  getJsonSchema(schemaPrefix: string): Observable<IB2kJsonSchema>{
    return this.httpClient.get<IB2kJsonSchema>(`./assets/json/${schemaPrefix}.schema.json`)
    .pipe(
      shareReplay(1),
      take(1),
      catchError(() => {
        console.info(`Error handled by ${this.SERVICE_NAME}`);
        return throwError(() => {
          console.log(`Error rethrown by ${this.SERVICE_NAME}`);
          return new Error(`Couln't load data...`);
        })
      })
    )
  }
}
