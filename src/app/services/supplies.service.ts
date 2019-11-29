import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {

  _apiUrl: string = "https://localhost:5001/api/supplies";

  constructor(private _http: HttpClient) { }

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
