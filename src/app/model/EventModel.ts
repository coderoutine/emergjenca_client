export class EventCreateModel{
      type:number
      severity: number
      time: number
      city: string
      country: string
      description: string
      lat: string
      lng: string
     constructor(input:EventCreateModel=null){
         if(!input) return;
         this.type=Number(input.type)
         this.severity=Number(input.severity)
         this.time=input.time;
         this.city=input.city;
         this.country=input.country;
         this.description=input.description;
         this.lat=input.lat;
         this.lng=input.lng
     }

     public toApiPayload(): EventCreateModel{
         //customize payload if necessary
         return this;
     }
}