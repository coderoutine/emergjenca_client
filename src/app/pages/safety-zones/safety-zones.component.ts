import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'app/services/events.service';


@Component({
    selector: 'safety-zones',
    moduleId: module.id,
    templateUrl: 'safety-zones.component.html',
    styleUrls: [ './safety-zones.component.css' ]
})

export class SafetyZonesComponent implements OnInit{

  lat: number = 41.329121;
  lng: number = 19.819628;
  event: any;
  eventId: string;
  type: number;
  shelters: any;

  constructor(private route: ActivatedRoute, private eventService: EventsService, private router: Router) {
    
  }

  details(){
    console.log("Here");
  }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get("eventId");
    this.type = Number(this.route.snapshot.paramMap.get("type"));

    this.eventService.getShelters({events:[this.eventId],types:[this.type]}).subscribe((data: any) => {
      this.shelters = data;
    }, error => {
      console.log("ERROR === ", error);
    });

    this.eventService.getEventByID(this.eventId).subscribe((data:any) => {
      this.event = data;
      this.lat = Number(data.lat);
      this.lng = Number(data.lng);
    }, error => {
      console.log("ERROR === > ", error);
    })
  }

  showShelters(){
    this.router.navigate(["shelters/"+this.eventId+"/"+2]);
  }

  showSafetyZones(){
    this.router.navigate(["safety-zones/"+this.eventId+"/"+1]);
  }

  showSupplies(){
    this.router.navigate(["supplies/"+this.eventId]);
  }
  
}
