
import { Injectable, inject, signal } from '@angular/core';
import { DataService } from 'index-db/services/data.service';
import { API_ENDPOINTS } from '../endpoints';
import { DBStores } from 'index-db/services/idb.store.model';

@Injectable({
  providedIn: 'root',
})
export class UnitService {

  dataService = inject(DataService);
  units = signal([]);

  list(){
    this.dataService.getListAsync(
      DBStores.Unit.TableName,
      API_ENDPOINTS.unit
    ).then(data => this.units.set(data))
  }

}