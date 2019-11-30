import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QueryFlattenerService } from './query-flattener.service';
import { BaseService } from './service.base';

@Injectable({
  providedIn: 'root'
})
export class EventsService  extends BaseService {

  _apiUrl: string = `${this.base_url}/events`;
  _sheltersApi: string = `${this.base_url}/shelters`
  _suppliesApi: string =  `${this.base_url}/supplies`
  _contactPersonsApi: string = `${this.base_url}/contactpersons`
  _volunteersApi: string = `${this.base_url}/volunteers`

  constructor(private _http: HttpClient, private queryFlattenerService:QueryFlattenerService) { super()}

  getAllEvents(){
    return this._http.get(this._apiUrl);
  }

  getAllVolunteers(){
    return this._http.get(this._volunteersApi);
  }

  getEventByID(eventID: string){
    return this._http.get(this._apiUrl+"/"+eventID);
  }

  addEvent(payload: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this._http.post(this._apiUrl, payload, httpOptions);
  }

  addShelter(payload: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this._http.post(this._sheltersApi, payload, httpOptions);
  }

  addSupply(payload: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this._http.post(this._suppliesApi, payload, httpOptions);
  }

  getShelters(filter: any){
    let queryStringFilter= this.queryFlattenerService.toQueryString(filter||{})
    return this._http.get(`${this._sheltersApi}?${queryStringFilter}`);
  }

  getSupplies(filter: any){
    let queryStringFilter= this.queryFlattenerService.toQueryString(filter||{})
    return this._http.get(`${this._suppliesApi}?${queryStringFilter}`);
  }

  getShelterContactPerson(id: number){
    return this._http.get(this._contactPersonsApi+"/"+id);
  }
}