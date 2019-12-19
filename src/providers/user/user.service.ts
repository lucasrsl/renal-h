import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import{ User } from '../../models/user.model';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserService {

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  create(user: User): Promise<void>{
    return null;
  }
}
