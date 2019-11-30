export class ShelterCreateModel{
      type:number
      capacity: number
      city: string
      country: string
      address: string
      name: string
      description: string
      lat: string
      lng: string
      eventId: string
     constructor(input:ShelterCreateModel=null){
         if(!input) return;
         this.type= Number(input.type) //Shelter
         this.capacity=Number(input.capacity)
         this.city=input.city;
         this.country=input.country;
         this.address=input.address;
         this.name=input.name;
         this.description=input.description;
         this.lat=input.lat;
         this.lng=input.lng
         this.eventId = input.eventId
     }

     public toApiPayload(): ShelterCreateModel{
         //customize payload if necessary
         return this;
     }
}