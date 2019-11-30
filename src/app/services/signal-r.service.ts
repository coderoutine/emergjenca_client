
import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { BaseService } from './service.base';
@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseService {
 
private hubConnection: signalR.HubConnection
 
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl(`${this.base_url}/notifications`)
                            .build();
 
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
 
  public on  (methodName: string, newMethod: (...args: any[]) => void) {
    this.hubConnection.on(methodName,newMethod);
  }
  public onNotify(newMethod: (...args: any[]) => void){
    this.on('notify',newMethod)
  }
}