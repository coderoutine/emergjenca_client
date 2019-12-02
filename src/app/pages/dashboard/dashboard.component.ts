import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Router } from '@angular/router';
import { EventsService } from 'app/services/events.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'app/services/signal-r.service';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  events: any[] = [];
  
  constructor(private router: Router, private _service: EventsService,private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.notificationService.onNotify(data=>this.loadData())
    this.loadData();
  }
  
  loadData(): void {
    this._service.getRelevantEvents().subscribe((data: any) => {
      console.log("DATA   ===  ", data);
     this.handleEventData(data)

    }, error => {
      console.log("ERROR   ===  ", error);
      this.events = [];
    })
  }
  handleEventData(data:any[]){
    switch(data.length){
      case 0 : alert('navigate to a page where it shows that there are not events');
      break;
      case 1 : this.details(data[0].id);
      break;
      default : break;
    }
    this.events = data;
  }
  
  details(id: string){
    this.router.navigate(["event-details/"+id])
  }


}
