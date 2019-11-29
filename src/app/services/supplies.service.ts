import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inherits } from 'util';
import { BaseService } from './service.base';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService extends BaseService {

  _apiUrl: string = `${this.base_url}/supplies`;

  constructor(private _http: HttpClient) { super()}

  getAllSupplies(){
    return this._http.get(this._apiUrl);
  }

  getSupplyByID(shelterID: string){
    return this._http.get(this._apiUrl+"/"+shelterID);
  }

  addSupply(payload: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this._http.post(this._apiUrl, payload, httpOptions);
  }
}
