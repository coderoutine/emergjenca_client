import { Injectable } from '@angular/core';
import { QueryFlattenerService } from './query-flattener.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './service.base';

@Injectable({
  providedIn: 'root'
})
export class SheltersService extends BaseService {

    _apiUrl: string = `${this.base_url}/shelters`;
  
  constructor(private _http: HttpClient, private queryFlattenerService:QueryFlattenerService) { super()}

  getAllShelters(){
    return this._http.get(this._apiUrl);
  }

  getShelterByID(shelterID: string){
    return this._http.get(this._apiUrl+"/"+shelterID);
  }

  addShelter(payload: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this._http.post(this._apiUrl, payload, httpOptions);
  }

  getShelters(filter: any){
    let queryStringFilter= this.queryFlattenerService.toQueryString(filter||{})
    return this._http.get(`${this._apiUrl}?${queryStringFilter}`);
  }
}
