import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Router } from '@angular/router';


@Component({
    selector: 'safety-zone-create',
    moduleId: module.id,
    templateUrl: 'safety-zone-create.component.html',
    styleUrls: [ './safety-zone-create.component.css' ]
})

export class SafetyZoneCreateComponent{

  constructor(private router: Router) {
    
  }

  lat: number = 41.329121; 
  lng: number = 19.819628; 19.819628;

  addSafetyZone(){
    console.log("Add Shelter");
  }

  mapClicked(event){
    console.log("CLICKED   ===   ", event.coords);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }
  
}
