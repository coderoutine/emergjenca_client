import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Router } from '@angular/router';
import { EventsService } from 'app/services/events.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'event-create',
    moduleId: module.id,
    templateUrl: 'event-create.component.html',
    styleUrls: [ './event-create.component.css' ]
})

export class EventCreateComponent implements OnInit{
  
  lat: number = 41.329121;
  lng: number = 19.819628;
  reportForm: FormGroup;

  constructor(private router: Router, private _service: EventsService, private fb: FormBuilder) { 
    this.reportForm = this.fb.group({
      type: [0, Validators.required],
      severity: [0, Validators.required],
      time: [0, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      description: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required]
    });
   }

   ngOnInit(): void {
    this.reportForm.controls['lat'].setValue(this.lat.toString());
    this.reportForm.controls['lng'].setValue(this.lng.toString());
  }

   onSubmit(form){
     console.log("FORM == ", this.reportForm.value);
     this._service.addEvent(this.reportForm.value).subscribe((data) => {
      console.log("EVENT ADDED => ", data);
      this.router.navigate(["dashboard"]);
    }, error => {
      console.log("ERROR  == ", error);
    })
   }

  mapClicked(event){
    this.reportForm.controls['lat'].setValue(event.coords.lat.toString());
    this.reportForm.controls['lng'].setValue(event.coords.lng.toString());

    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  } 
}
