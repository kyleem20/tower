// // {
// //   id: 'Bid id'
// //   carId: 'Car id'
// //   bidderId: 'Some account Id',
// //   price: SOME NUMBER
// //   ?car: {... car data}
// //   ?bidder: {.... account data}
// // }


class Attendee {
    constructor(data) {
      this.attendeeId = data.id
      this.accountId = data.accountId
      this.eventId = data.eventId
    }
  }
  

export class EventAttendee extends Attendee{
    constructor(data){
        super(data)
        this.eventId = data.event.id
        this.eventName = data.event.name
        this.description = data.event.description
        this.image = data.event.coverImg
        this.location = data.event.location
        this.capacity = data.event.capacity
        this.startDate = data.event.startDate
        this.isCancelled = data.event.isCanceled
        this.type = data.event.type
        this.creatorId = data.event.creatorId
        this.creator = data.event.creator
    }
}
  
  export class AccountAttendee extends Attendee {
    constructor(data) {
      super(data)
      this.id = data.account.id
      this.name = data.account.name
      this.picture = data.account.picture
    }
  }