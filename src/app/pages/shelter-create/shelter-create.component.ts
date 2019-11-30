import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Router } from '@angular/router';
import { EventsService } from 'app/services/events.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShelterCreateModel } from 'app/model/ShelterModel';


@Component({
    selector: 'shelter-create',
    moduleId: module.id,
    templateUrl: 'shelter-create.component.html',
    styleUrls: [ './shelter-create.component.css' ]
})

export class ShelterCreateComponent implements OnInit{
  shelterForm: FormGroup;
  
  events: any;
  volunteers: any;
  lat: number = 41.329121; 
  lng: number = 19.819628;



  constructor(private router: Router, private _service: EventsService, private fb: FormBuilder) {
    this.shelterForm = this.fb.group({
      type:[0, Validators.required],
      name: ['', Validators.required],
      capacity: [0, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      eventId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.assignLatLngToForm()
    this.getAllEvents();
    this.getAllVolunteers();
    
  }

  onSubmit() {
    console.log("FORM == ", this.shelterForm.value );
    var data = new ShelterCreateModel(this.shelterForm.value as ShelterCreateModel);
    console.log("FORM == ", data );
    this._service.addShelter(data.toApiPayload()).subscribe((data) => {
      console.log("SHELTER ADDED => ", data);
      this.router.navigate(["dashboard"]);
    }, error => {
      console.log("ERROR  == ", error);
    })
  }

  assignLatLngToForm() {
    this.shelterForm.controls['lat'].setValue(this.lat.toString());
    this.shelterForm.controls['lng'].setValue(this.lng.toString());
  }

  getAllVolunteers(){
    this._service.getAllVolunteers().subscribe((data: any) => {
      this.volunteers = data;
    })
  }
  getAllEvents(){
    this._service.getAllEvents().subscribe((data: any) => {
      this.events = data.filter(n => n.verified == true);
    });
  }

  mapClicked(event){
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }
  
}
