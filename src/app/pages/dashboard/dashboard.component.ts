import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Router } from '@angular/router';
import { EventsService } from 'app/services/events.service';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  events: any[] = [];
  
  constructor(private router: Router, private _service: EventsService) {
  }

  ngOnInit(): void {
    this._service.getAllEvents().subscribe((data: any) => {
      console.log("DATA   ===  ", data);
      this.events = data;

    }, error => {
      console.log("ERROR   ===  ", error);
      this.events = [];
    })
  }

  details(id: string){
    this.router.navigate(["event-details/"+id])
  }

  get verifiedEvents(){
    return this.events.filter(n => n.verified == true).length;
  }

  get nonVerifiedEvents(){
    return this.events.filter(n => n.verified == false).length;
  }
}
