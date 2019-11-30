import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Router } from '@angular/router';
import { EventsService } from 'app/services/events.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeoLocationService } from 'app/services/geolocation.service';


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
  }

  ngOnInit(): void {
    this.assignLatLngToForm()
    // this.trySetCurrentLocation();
  }

  onSubmit(form) {
    console.log("FORM == ", this.reportForm.value);
    this._service.addEvent(this.reportForm.value).subscribe((data) => {
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
           this.loadGeolocationDetails(pos);
        }
      });

  }
  loadGeolocationDetails(pos:Position){
    this.geoLocationService.getGeolocationDetails(pos).subscribe(result=>{
        console.log("GEOLOCATION DETAILS => ", result)
    })
  }
}
