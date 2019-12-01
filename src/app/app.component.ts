import { Component } from '@angular/core';
import { NotificationService } from './services/signal-r.service';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  
  constructor(private router: Router,private notificationService:NotificationService,private toastr: ToastrService){
    this.setupAnalytics();
    notificationService.startConnection();
    notificationService.onNotify((data)=>{
      console.log('notification data',data)
      //personalize message more depending on type returned from data.Type
      this.toastr.info('Informacion', 'Eshte shtuar nje informacion i ri.');
    })
  }

setupAnalytics(){
  this.router.events.subscribe(event => {
    if(event instanceof NavigationEnd){
        gtag('config', 'UA-63386580-4', 
              {
                'page_path': event.urlAfterRedirects
              }
             );
     }
  }
)}
}

