import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QueryFlattenerService } from './query-flattener.service';
import { BaseService } from './service.base';

@Injectable({
  providedIn: 'root'
})
export class EventsService  extends BaseService {

  _relevantEventsUrl: string = `${this.base_url}/events/relevant`;
  _eventUrl: string = `${this.base_url}/events`;
  _sheltersApi: string = `${this.base_url}/shelters`
  _suppliesApi: string =  `${this.base_url}/supplies`
  _contactPersonsApi: string = `${this.base_url}/contactpersons`
  _volunteersApi: string = `${this.base_url}/volunteers`

  constructor(private _http: HttpClient, private queryFlattenerService:QueryFlattenerService) { super()}

  getRelevantEvents(){
    return this._http.get(this._relevantEventsUrl);
  }
  getAllEvents(){
    return this._http.get(this._eventUrl);
  }

  getAllVolunteers(){
    return this._http.get(this._volunteersApi);
  }

  getEventByID(eventID: string){
    return this._http.get(this._eventUrl+"/"+eventID);
  }

  addEvent(payload: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this._http.post(this._eventUrl, payload, httpOptions);
  }

  addShelter(payload: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this._http.post(this._sheltersApi, payload, httpOptions);
  }

  updateShelter(payload: any, shelterId: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this._http.put(this._sheltersApi+"/"+shelterId, payload, httpOptions);
  }

  removeShelter(id: string){
    return this._http.delete(this._sheltersApi+"/"+id);
  }

  updateSupply(payload: any, supplyId: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this._http.put(this._sheltersApi+"/"+supplyId, payload, httpOptions);
  }

  addSupply(payload: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this._http.post(this._suppliesApi, payload, httpOptions);
  }

  removeSupply(id: string){
    return this._http.delete(this._suppliesApi+"/"+id);
  }

  getShelters(filter: any){
    let queryStringFilter= this.queryFlattenerService.toQueryString(filter||{})
    return this._http.get(`${this._sheltersApi}?${queryStringFilter}`);
  }

  getShelterById(id: string){
      return this._http.get(`${this._sheltersApi}/${id}`);
  }

  getSupplyById(id: string){
    return this._http.get(`${this._suppliesApi}/${id}`);
}

  getSupplies(filter: any){
    let queryStringFilter= this.queryFlattenerService.toQueryString(filter||{})
    return this._http.get(`${this._suppliesApi}?${queryStringFilter}`);
  }

  getShelterContactPerson(id: number){
    return this._http.get(this._contactPersonsApi+"/"+id);
  }
}