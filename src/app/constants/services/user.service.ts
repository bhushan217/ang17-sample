
import { Injectable, inject, signal } from '@angular/core';
import { DataService } from 'index-db/services/data.service';
import { API_ENDPOINTS } from '../endpoints';
import { IUser } from 'index-db/index-db-interfaces/user.interface';
import { DBStores } from 'index-db/services/idb.store.model';
import { User } from 'index-db/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  dataService = inject(DataService);
  users = signal<User[]>([]);

  list(){
    this.dataService.getListAsync(
      DBStores.User.TableName,
      API_ENDPOINTS.user
    ).then(data => this.users.set(data))
  }

}