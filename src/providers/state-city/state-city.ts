import { Http,Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

/*
  Generated class for the StateCityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StateCityProvider {

  constructor(public http: Http) {
    console.log('Hello StateCityProvider Provider');
  }
  getStateCityData(){
    return this.http.get('../assets/data/states.json').map((res: Response) => res.json());

  }
}
