import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Router } from '@angular/router';
import { EventsService } from 'app/services/events.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeoLocationService } from 'app/services/geolocation.service';
import { EventCreateModel } from 'app/model/EventModel';


@Component({
  selector: 'event-create',
  moduleId: module.id,
  templateUrl: 'event-create.component.html',
  styleUrls: ['./event-create.component.css']
})

export class EventCreateComponent implements OnInit {

  lat: number = 41.329121;
  lng: number = 19.819628;
  reportForm: FormGroup;

  constructor(private router: Router, private _service: EventsService, private fb: FormBuilder, private geoLocationService: GeoLocationService) {
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
    this.reportForm.controls['time'].setValue(new Date().toISOString().substring(0,10));

  }

  ngOnInit(): void {
    this.assignLatLngToForm()
    this.trySetCurrentLocation();
  }

  onSubmit(form) {
    var data = new EventCreateModel(this.reportForm.value as EventCreateModel);
    console.log("FORM == ", data );
    this._service.addEvent(data.toApiPayload()).subscribe((data) => {
      console.log("EVENT ADDED => ", data);
      this.router.navigate(["dashboard"]);
    }, error => {
      console.log("ERROR  == ", error);
    })
  }

  mapClicked(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.assignLatLngToForm()
    this.loadGeolocationDetails();
  }

  assignLatLngToForm() {
    this.reportForm.controls['lat'].setValue(this.lat.toString());
    this.reportForm.controls['lng'].setValue(this.lng.toString());
  }
  trySetCurrentLocation() {
    console.log('TRYING TO SET POSITION')

    this.geoLocationService.getPosition().subscribe(

      (pos: Position) => {

        console.log("GEOLOCATION RETREIVED =>", pos)

        if (pos != null) {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;
          this.assignLatLngToForm()
           this.loadGeolocationDetails();
        }
      });

  }
  loadGeolocationDetails(){
    this.geoLocationService.getGeolocationDetails(this.lat,this.lng).subscribe(result=>{
        console.log("GEOLOCATION DETAILS => ", result)
        this.reportForm.controls['city'].setValue(result && result.city);
        this.reportForm.controls['country'].setValue(result && result.country);
    })
  }
}
