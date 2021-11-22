export class Event{
    constructor(data = {}){
        this.eventId = data.id
        this.eventName = data.name
        this.description = data.description
        this.image = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = data.startDate
        this.isCancelled = data.isCanceled
        this.type = data.type
        this.creatorId = data.creatorId
        this.creator = data.creator
    }
}