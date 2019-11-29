import { Component } from '@angular/core';
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  constructor(private signalRService:SignalRService){
    signalRService.startConnection();
    signalRService.onNotify((data)=>{
      console.log('notification data',data)
      alert('new notification ' + data.Type)
    })
  }
}
