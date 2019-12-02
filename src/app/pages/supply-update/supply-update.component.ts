import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EventsService } from 'app/services/events.service';
import { GeoLocationService } from 'app/services/geolocation.service';
import { SupplyModel } from 'app/model/SupplyModel';
import {SupplyStatus} from 'app/data/enums/SupplyStatus'

@Component({
    selector: 'supply-update',
    moduleId: module.id,
    templateUrl: 'supply-update.component.html',
    styleUrls: [ './supply-update.component.css' ]
})

export class SupplyUpdateComponent implements OnInit{
  

  lat: number = 41.329121; 
  lng: number = 19.819628;
  supplyForm: FormGroup;
  contactPersons: FormArray;
  eventId: string;
  supplyId: string;
  supply: any;

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
      contactPersons: this.fb.array([ this.createContact() ])
    });
  }

  ngOnInit(): void {
    this.supplyId = this._route.snapshot.paramMap.get("supplyId");
    this.getSupplyDetails(this.supplyId);

    this.getRouteParameters();
    this.assignLatLngToForm();
  }

  getSupplyDetails(shelterId){
    this._service.getSupplyById(shelterId).subscribe((data) => {
      this.supply = data;
      console.log(this.supply);
      this.assignValuesToSupplyForm(this.supply);
      this.patch(this.supply.contactPersons);
    }, error => {
      console.log("Error   ===   ", error);
    })
  }

  assignValuesToSupplyForm(shelter){
    console.log(shelter)
    this.supplyForm = this.fb.group({
      name: [shelter.name, Validators.required],
      description: [shelter.description, Validators.required],
      address: [shelter.address, Validators.required],
      city: [shelter.city, Validators.required],
      country: [shelter.country, Validators.required],
      lat: [shelter.lat, Validators.required],
      lng: [shelter.lng, Validators.required],
      status: [shelter.status, Validators.required],
      eventId: [shelter.eventId, Validators.required],
      contactPersons: this.fb.array([])
    });
  }

  patch(contactPersons) {
    const control = <FormArray>this.supplyForm.get('contactPersons');
    contactPersons.forEach(x => {
      control.push(this.addExistingContact(x))
    });
  }

  addExistingContact(contact): FormGroup {
    return this.fb.group({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone,
      email: contact.email,
    });
  }

  createContact(): FormGroup {
    return this.fb.group({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    });
  }


  addNewContact(){
    this.addItem();
  }

  removeContact(){
    if((this.supplyForm.get('contactPersons') as FormArray).length > 1){
      this.contactPersons = this.supplyForm.get('contactPersons') as FormArray;
      this.contactPersons.removeAt(this.contactPersons.length - 1);
    } else {
    }
  }
  
  addItem(): void {
    this.contactPersons = this.supplyForm.get('contactPersons') as FormArray;
    this.contactPersons.push(this.createContact());
  }

  getRouteParameters(){
    this.eventId = this._route.snapshot.paramMap.get("id");
    this.supplyForm.controls['eventId'].setValue(this.eventId);
    this.supplyForm.controls['status'].setValue(SupplyStatus.Open);
  }

  assignLatLngToForm() {
    this.supplyForm.controls['lat'].setValue(this.lat.toString());
    this.supplyForm.controls['lng'].setValue(this.lng.toString());
  }

  onSubmit() {
    console.log("FORM == ", this.supplyForm.value );
    var data = new SupplyModel(this.supplyForm.value as SupplyModel);
    console.log("FORM == ", data );
    this._service.updateSupply(data.updateSupplyApi(this.supplyId), this.supplyId).subscribe((data) => {
      this.router.navigate([window.location.origin+"/event-details/"+this.eventId]);
    }, error => {
      alert("Ju nuk jeni i autorizuar per te fshire kete element!");
      console.log("ERROR  == ", error);
    })
  }

  mapClicked(event){
    console.log("CLICKED   ===   ", event.coords);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }
  
}
