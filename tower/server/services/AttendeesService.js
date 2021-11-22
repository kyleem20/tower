import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { eventsService } from './EventsService'

class AttendeesService {
  async create(data) {
    await eventsService.getById(data.eventId)
    const found = await dbContext.Attendees.findOne({ eventId: data.eventId, accountId: data.accountId })

    if (found) {
      throw new BadRequest('You are already attending this event')
    }
    const attend = await dbContext.Attendees.create(data)
    await attend.populate('account', 'event')
    return attend
  }

  async getAttendeesEvents(query = {}) {
    const events = await dbContext.Attendees.find(query)
      .populate('account', 'event')
    return events
  }

  async getAttending(id) {
    const events = await dbContext.Attendees.find(id)
      .populate('account', 'event')
    return events
  }

  async remove(id, userId) {
    const found = await dbContext.Attendees.findById(id)
    if (found.accountId.toString() !== userId) {
      throw new Forbidden('You cannot remove this attendee')
    }
    await dbContext.Attendees.findByIdAndDelete(id)
    await eventsService.capacityDecrease(found.eventId)
  }
}

export const attendeesService = new AttendeesService()

//   async create(body) {
// const attendees = await dbContext.Attendees.create(data)
// await attendees.populate('account', 'event')
// await eventsService.capacity(data.eventId)
// await commentsService.isAttending(data.eventId, true)
//     const newAttendee = await dbContext.Attendees.create(body)
//     return newAttendee.populate('account', 'name')
//   }

//   async getAll(query = {}) {
//     return await dbContext.Attendees.find(query).populate('account', 'name')
//   }

//   async getAttendees(query = {}) {
//     const events = await dbContext.Attendees.find(query)
//       .populate('account')
//       .populate('event')
//     return events
//   }

//   async getAttendeeByEvent(eventId) {
//     return await dbContext.Attendees.find({ eventId }).populate('attendee')
//   }

//   async getAttendeesByAccountId(accountId) {
//     return await dbContext.Attendees.find({ accountId }).populate('attendee')
//   }

//   async getById(id) {
//     const attendee = await dbContext.Attendees.findById(id).populate('account', 'name')
//     if (!attendee) {
//       throw new BadRequest('Invalid Id')
//     }
//     return attendee
//   }

//   async remove(attendeeId, userId) {
//     const attendee = await this.getById(attendeeId)
//     if (attendee.accountId.toString() !== userId) {
//       throw new Forbidden('You are not aloud to delete this attendee')
//     }
//     await dbContext.Attendees.findByIdAndDelete(attendeeId)
//   }

//   async edit(body) {
//     const attendee = await this.getById(body.id)
//     if (attendee.accountId.toString() !== body.accountId) {
//       throw new Forbidden('You are not aloud to edit this attendee')
//     }
//     const updateAttendee = dbContext.Attendees.findOneAndUpdate({ _id: body.id }, body, { new: true })
//     return await updateAttendee
//   }
// }
