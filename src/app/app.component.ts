import { Component } from '@angular/core';
import { NotificationService } from './services/signal-r.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  constructor(private notificationService:NotificationService,private toastr: ToastrService){
    notificationService.startConnection();
    notificationService.onNotify((data)=>{
      console.log('notification data',data)
      //personalize message more depending on type returned from data.Type
      this.toastr.info('Informacion', 'Eshte shtuar nje informacion i ri.');
    })
  }
}
