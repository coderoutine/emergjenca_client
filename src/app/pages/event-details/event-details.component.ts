import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from 'app/services/events.service';
import { QueryFlattenerService } from 'app/services/query-flattener.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'event-details',
    moduleId: module.id,
    templateUrl: 'event-details.component.html',
    styleUrls: [ './event-details.component.css' ]
})

export class EventDetailsComponent implements OnInit{
  modalOptions:NgbModalOptions;

  lat: number;
  lng: number;
  eventId: string;
  event: any;

  type: number;
  shelter: any;
  supply: any;
  shelters: any;
  supplies: any;
  contactPersons: any[];

  showShelters: boolean = false;
  showSafetyZones: boolean = false;
  showSupplies: boolean = false;

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private service: EventsService, 
    private eventService:EventsService,
    private queryFlattenerService: QueryFlattenerService,
    private modalService: NgbModal
    ) 
    {
      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop'
      }
    }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get("id");
    this.service.getEventByID(this.eventId).subscribe((data:any) => {
      this.event = data;
      this.lat = Number(data.lat);
      this.lng = Number(data.lng);
    }, error => {
      console.log("ERROR === > ", error);
    })
  }

  getShelters(){
    this.type = 2;
    this.eventService.getShelters({events:[this.eventId],types:[this.type]}).subscribe((data: any) => {
      this.shelters = data;
      this.showShelters = true;
      this.showSafetyZones = false;
    }, error => {
      this.showShelters = false;
      this.showSafetyZones = false;
    })
  }

  getSafetyZones(){
    this.type = 1;
    this.eventService.getShelters({events:[this.eventId],types:[this.type]}).subscribe((data: any) => {
      this.shelters = data;
      this.showSafetyZones = true;
      this.showShelters = false;
    }, error => {
      this.showSafetyZones = false;
      this.showShelters = false;
    });
  }

  getSupplies(){
    this.eventService.getSupplies({events:[this.eventId], types:[]}).subscribe((data: any) => {
      this.supplies = data;
      this.showSafetyZones = false;
      this.showShelters = false;
      this.showSupplies = true;
    }, error => {
      this.showSafetyZones = false;
      this.showShelters = false;
      this.showSupplies = false;
    })
  }

  open(content) {
    const modalRef = this.modalService.open(content);
    modalRef.componentInstance.name = 'World';
  }


  showShelterContacts(contactPersons, content){

    console.log("Contact Persons == ", contactPersons);
    this.contactPersons = contactPersons;
    this.modalService.open(content, this.modalOptions).result.then((result) => {
    }, (reason) => {
    });
  }


  addShelterToEvent(){
    this.router.navigate([this.router.url+"/shelter-create/2"]);
  }

  addSafetyZoneToEvent(){
    this.router.navigate([this.router.url+"/shelter-create//1"]);
  }

  addSupplyToEvent(){
    this.router.navigate([this.router.url+"/supply-create"]);
  }


  removeShelter(shelter, contentDeleteConfirmation){
    this.shelter = shelter;
    console.log("SHELTER == ", shelter);

    this.modalService.open(contentDeleteConfirmation, this.modalOptions).result.then((result) => {
      console.log(result);
      if(result){
        console.log("KONFIRMO");
        this.service.removeShelter(shelter.id).subscribe(() => {
          console.log("Shelter deleted");
        }, error => {
          console.log("Shelter could not be deleted: ", error);
        })
      } else {
        console.log("ANULLO");
      }
    }, (reason) => {
    });
  }

  removeSupply(supply, contentDeleteConfirmation){
    this.supply = supply;

    this.modalService.open(contentDeleteConfirmation, this.modalOptions).result.then((result) => {
      console.log(result);
      if(result){
        console.log("KONFIRMO");
        this.service.removeShelter(supply.id).subscribe(() => {
          console.log("Shelter deleted");
        }, error => {
          console.log("Shelter could not be deleted: ", error);
        })
      } else {
        console.log("ANULLO");
      }
    }, (reason) => {
    });
  }

  updateShelter(shelter){
    this.router.navigate([this.router.url+"/shelter-update/"+shelter.id]);
  }

}
