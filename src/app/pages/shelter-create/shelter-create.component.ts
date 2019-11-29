import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Router } from '@angular/router';
import { EventsService } from 'app/services/events.service';


@Component({
    selector: 'shelter-create',
    moduleId: module.id,
    templateUrl: 'shelter-create.component.html',
    styleUrls: [ './shelter-create.component.css' ]
})

export class ShelterCreateComponent implements OnInit{
  
  events: any;
  lat: number = 41.329121; 
  lng: number = 19.819628;

  // payload = {
  //   type = 1,

  // }

  //       public ShelterType Type { get; set; }
  //       public int? Capacity { get; set; }
  //       public string City { get; set; }
  //       public string Country { get; set; }
  //       public string Address { get; set; }
  //       public string Name { get; set; }
  //       public string Description { get; set; }
  //       public string Location { get; set; }
  //       public Guid EventId { get; set; }


  constructor(private router: Router, private service: EventsService) {
  }

  ngOnInit() {
    this.service.getAllEvents().subscribe((data: any) => {
      this.events = data.filter(n => n.verified == true);
      console.log("EVENTS  ==  ", this.events);
    });
  }

 

  addShelter(){
    console.log("Add Shelter");
  }

  mapClicked(event){
    console.log("CLICKED   ===   ", event.coords);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }
  
}
