import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Router } from '@angular/router';


@Component({
    selector: 'supply-create',
    moduleId: module.id,
    templateUrl: 'supply-create.component.html',
    styleUrls: [ './supply-create.component.css' ]
})

export class SupplyCreateComponent{

  constructor(private router: Router) {
    
  }

  lat: number = 41.329121; 
  lng: number = 19.819628; 19.819628;

  addSupply(){
    console.log("Add Shelter");
  }

  mapClicked(event){
    console.log("CLICKED   ===   ", event.coords);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }
  
}
