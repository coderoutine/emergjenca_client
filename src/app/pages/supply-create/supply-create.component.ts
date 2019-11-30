import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventsService } from 'app/services/events.service';
import { GeoLocationService } from 'app/services/geolocation.service';
import { SupplyModel } from 'app/model/SupplyModel';
import {SupplyStatus} from 'app/data/enums/SupplyStatus'

@Component({
    selector: 'supply-create',
    moduleId: module.id,
    templateUrl: 'supply-create.component.html',
    styleUrls: [ './supply-create.component.css' ]
})

export class SupplyCreateComponent implements OnInit{
  

  lat: number = 41.329121; 
  lng: number = 19.819628;
  supplyForm: FormGroup;
  eventId: string;

  constructor(private router: Router, 
    private _route: ActivatedRoute,
    private _service: EventsService, 
    private fb: FormBuilder, 
    private geoLocationService: GeoLocationService) {
    this.supplyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      status: [0, Validators.required],
      eventId: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getRouteParameters();

  }

  getRouteParameters(){
    this.eventId = this._route.snapshot.paramMap.get("id");
    this.supplyForm.controls['eventId'].setValue(this.eventId);
    this.supplyForm.controls['status'].setValue(SupplyStatus.Open);
  }

  onSubmit() {
    console.log("FORM == ", this.supplyForm.value );
    var data = new SupplyModel(this.supplyForm.value as SupplyModel);
    console.log("FORM == ", data );
    this._service.addSupply(data.toApiPayload()).subscribe((data) => {
      console.log("SHELTER ADDED => ", data);
      this.router.navigate(["dashboard"]);
    }, error => {
      console.log("ERROR  == ", error);
    })
  }

  mapClicked(event){
    console.log("CLICKED   ===   ", event.coords);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }
  
}
