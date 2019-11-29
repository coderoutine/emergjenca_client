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
  shelters: any;
  supplies: any;
  contactPerson: any;

  showShelters: boolean = false;
  showSafetyZones: boolean = false;
  showSupplies: boolean = false;
  showModal: boolean = false;

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
    // this.router.navigate(["supplies/"+this.eventId]);
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

  showShelterContact(contactId, mymodal){
    this.service.getShelterContactPerson(contactId).subscribe((data: any) => {
      console.log("CONTACT DETAILS  ===  ", data);
      this.contactPerson = data;
      this.showModal = true;
      
      this.modalService.open(mymodal, this.modalOptions).result.then((result) => {
        // this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

    }, error => {
      console.log("ERROR CONTACT  ===  ", error);
      this.showModal = false;
    })
  }

  // open(content) {
  //   this.modalService.open(content, this.modalOptions).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
}
