import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from 'app/services/events.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ShelterCreateModel } from 'app/model/ShelterModel';


@Component({
    selector: 'shelter-create',
    moduleId: module.id,
    templateUrl: 'shelter-create.component.html',
    styleUrls: [ './shelter-create.component.css' ]
})

export class ShelterCreateComponent implements OnInit{
  shelterForm: FormGroup;
  contactPersons: FormArray;
  eventId: string;
  eventType: number;
  
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

  removeContact(index:number){
    this.contactPersons = this.shelterForm.get('contactPersons') as FormArray;
    this.contactPersons.removeAt(index);
  }
  
  addItem(): void {
    this.contactPersons = this.shelterForm.get('contactPersons') as FormArray;
    this.contactPersons.push(this.createContact());
  }

  ngOnInit() {
    this.getRouteParameters();
    this.assignLatLngToForm();
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

  getRouteParameters(){
    this.eventType = Number(this.route.snapshot.paramMap.get("type"));
    this.eventId = this.route.snapshot.paramMap.get("id");

    this.shelterForm.controls['type'].setValue(this.eventType);
    this.shelterForm.controls['eventId'].setValue(this.eventId);
  }

  assignLatLngToForm() {
    this.shelterForm.controls['lat'].setValue(this.lat.toString());
    this.shelterForm.controls['lng'].setValue(this.lng.toString());
  }

  mapClicked(event){
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }
}
