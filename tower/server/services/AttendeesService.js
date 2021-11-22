import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { eventsService } from './EventsService'

class AttendeesService {
  async getAttendeesByEvents(eventId) {
    const events = await dbContext.Attendees.find({ eventId }).populate('account')
    return events
  }

  async getAttendeesEventsAttending(query = {}) {
    const events = await dbContext.Attendees.find({ query }).populate('account').populate('event')
    return events
  }

  async getAttendeesByAccount(accountId) {
    return await dbContext.Attendees.find({ accountId }).populate('event')
  }

  async create(body) {
    await eventsService.getById(body.eventId)
    const found = await dbContext.Attendees.findOne({ eventId: body.eventId, accountId: body.accountId })
    if (found) {
      throw new BadRequest('You are already attending this event')
    }
    const attend = await dbContext.Attendees.create(body)
    await eventsService.capacity(body.eventId)
    await attend.populate('account', 'event')
    return attend
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
