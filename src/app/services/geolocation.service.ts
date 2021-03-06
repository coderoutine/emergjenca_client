import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
export class GeolocationDetails {
  city: string
  country: string
  neighbourhood: string
  postcode: string
}
@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  coordinates: any;

  constructor(private _http: HttpClient) { }

  public getPosition(): Observable<Position> {
    return Observable.create(
      (observer) => {
        navigator.geolocation.watchPosition((pos: Position) => {
          observer.next(pos);
        }),
          () => {
            console.log('Position is not available');
          },
          {
            enableHighAccuracy: true
          };
      });
  }

  public getGeolocationDetails(lat:number, lng:number): Observable<GeolocationDetails> {
   return this._http.get(`https://eu1.locationiq.com/v1/reverse.php?key=7e8d552d2fe686&lat=${lat}&lon=${lng}&format=json`)
   .pipe(
      map((response: any) => {
        return {
          city: response.address.city || response.address.village,
          country: response.address.country,
          neighbourhood: response.address.neighbourhood,
          postcode: response.address.postcode
        }
      }));
  }
}