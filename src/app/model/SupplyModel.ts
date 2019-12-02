import { ContactPerson } from './ContactPerson'

export class SupplyModel{
      id: string;
      name: string
      city: string
      country: string
      address: string
      description: string
      lat: string
      lng: string
      status: number
      eventId: string
      contactPersons: ContactPerson[]

     constructor(input:SupplyModel=null){
         if(!input) return;
         this.name=input.name;
         this.city=input.city;
         this.country=input.country;
         this.address=input.address;
         this.description=input.description;
         this.lat=input.lat;
         this.lng=input.lng;
         this.status = input.status;
         this.eventId = input.eventId
         this.contactPersons = input.contactPersons
     }

     public toApiPayload(): SupplyModel{
         //customize payload if necessary
         return this;
     }

     public updateSupplyApi(id): any{
        //customize payload if necessary
        this.id = id;
        return this;
    }
}