import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QueryFlattenerService } from './query-flattener.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  _apiUrl: string = "https://localhost:5001/api/events";
  _sheltersApi: string = "https://localhost:5001/api/shelters";
  _suppliesApi: string = "https://localhost:5001/api/supplies";
  _contactPersonsApi: string = "https://localhost:5001/api/contactpersons";

  constructor(private _http: HttpClient, private queryFlattenerService:QueryFlattenerService) { }

  getAllEvents(){
    return this._http.get(this._apiUrl);
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