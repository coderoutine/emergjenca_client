import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Router } from '@angular/router';
import { EventsService } from 'app/services/events.service';


@Component({
    selector: 'event-create',
    moduleId: module.id,
    templateUrl: 'event-create.component.html',
    styleUrls: [ './event-create.component.css' ]
})

export class EventCreateComponent{


  payload = {
    type: 0,
    severity: 0,
    time: null,
    country: '',
    city:'',
    description: '',
    lat: '',
    lng: ''
  }

  lat: number = 41.329121;
  lng: number = 19.819628;



  constructor(private router: Router, private _service: EventsService) {  }

  addEvent(){
    console.log("EVENT == ", this.payload);
    this.payload.severity = Number(this.payload.severity);
    this.payload.type = Number(this.payload.type);
    this.payload.lat = this.payload.lat.toString();
    this.payload.lng = this.payload.lng.toString();

    this._service.addEvent(this.payload).subscribe((data) => {
      console.log("EVENT ADDED => ", data);
      this.router.navigate(["dashboard"]);
    }, error => {
      console.log("ERROR  == ", error);
    })

  }

  mapClicked(event){
    console.log("CLICKED   ===   ", event.coords);
    this.payload.lat = event.coords.lat.toString();
    this.payload.lng = event.coords.lng.toString();

    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  } 
}
