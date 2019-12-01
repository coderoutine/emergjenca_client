import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from 'app/services/events.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ShelterCreateModel } from 'app/model/ShelterModel';


@Component({
    selector: 'shelter-update',
    moduleId: module.id,
    templateUrl: 'shelter-update.component.html',
    styleUrls: [ './shelter-update.component.css' ]
})

export class ShelterUpdateComponent implements OnInit{
  shelterForm: FormGroup;
  contactPersons: FormArray;
  eventId: string;

  shelterId: string;
  shelter: any;
  
  events: any;
  volunteers: any;
  lat: number = 41.329121; 
  lng: number = 19.819628;



  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private _service: EventsService, 
    private fb: FormBuilder) {

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
        eventId: ['', Validators.required],
        contactPersons: this.fb.array([ this.createContact() ])
      });
  }

  ngOnInit() {
    this.shelterId = this.route.snapshot.paramMap.get("shelterId");
    this.getShelterDetails(this.shelterId);
    this.assignLatLngToForm();
  }

  getShelterDetails(shelterId){
    this._service.getShelterById(shelterId).subscribe((data) => {
      this.shelter = data;
      console.log(this.shelter);
      this.assignValuesToShelterForm(this.shelter);
      this.patch(this.shelter.contactPersons);
    }, error => {
      console.log("Error   ===   ", error);
    })
  }

  assignValuesToShelterForm(shelter){
    console.log(shelter)
    this.shelterForm = this.fb.group({
      type:[shelter.type, Validators.required],
      name: [shelter.name, Validators.required],
      capacity: [shelter.capacity, Validators.required],
      city: [shelter.city, Validators.required],
      country: [shelter.country, Validators.required],
      address: [shelter.address, Validators.required],
      description: [shelter.description, Validators.required],
      lat: [shelter.lat, Validators.required],
      lng: [shelter.lng, Validators.required],
      eventId: [shelter.eventId, Validators.required],
      contactPersons: this.fb.array([])
    });
  }

  patch(contactPersons) {
    const control = <FormArray>this.shelterForm.get('contactPersons');
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
  

  addExistingContacts(contactPersons){
    console.log("CONTACT PERSONS  ==  ", contactPersons);
    contactPersons.forEach(person => {
      console.log("PERSON  == ", person);
      (this.shelterForm.get('contactPersons') as FormArray).push(person);
    });
  }

  addNewContact(){
    this.addItem();
  }

  removeContact(){
    if((this.shelterForm.get('contactPersons') as FormArray).length > 1){
      this.contactPersons = this.shelterForm.get('contactPersons') as FormArray;
      this.contactPersons.removeAt(this.contactPersons.length - 1);
    } else {
    }
  }
  
  addItem(): void {
    this.contactPersons = this.shelterForm.get('contactPersons') as FormArray;
    this.contactPersons.push(this.createContact());
  }

  createContact(): FormGroup {
    return this.fb.group({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    });
  }

  

  onSubmit() {
    console.log("FORM == ", this.shelterForm.value );
    var data = new ShelterCreateModel(this.shelterForm.value as ShelterCreateModel);
    console.log("FORM == ", data );
    this._service.updateShelter(data.updateShelterApi(this.shelterId), this.shelterId).subscribe((data) => {
      console.log("SHELTER ADDED => ", data);
      this.router.navigate(["dashboard"]);
    }, error => {
      console.log("ERROR  == ", error);
    })
  }

  getRouteParameters(){
    this.shelterId = this.route.snapshot.paramMap.get("shelterId");
    this.eventId = this.route.snapshot.paramMap.get("id");

    // this.shelterForm.controls['eventId'].setValue(this.eventId);
  }

  assignLatLngToForm() {
    this.shelterForm.controls['lat'].setValue(this.lat.toString());
    this.shelterForm.controls['lng'].setValue(this.lng.toString());
  }

  mapClicked(event){
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;

    this.shelterForm.controls['lat'].setValue(event.coords.lat.toString());
    this.shelterForm.controls['lng'].setValue(event.coords.lng.toString());
  }
}
