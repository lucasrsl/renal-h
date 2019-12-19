import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ServiceModel} from '../../providers/utils/service-model';


/*
  Generated class for the LiquidControllerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InternetErrorService extends ServiceModel {

  constructor(public http: HttpClient) {
    super();
    this.setHttpClient(this.http);
  }

}
