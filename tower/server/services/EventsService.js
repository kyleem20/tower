import { dbContext } from '../db/DbContext'
import { logger } from '../utils/Logger'
import { BadRequest, Forbidden } from '../utils/Errors'

class EventsService {
  constructor() {
    logger.log('event service is here')
  }

  async getAll(query = {}) {
    return await dbContext.Event.find(query).populate('creator', 'name')
  }

  async getById(id) {
    const event = await dbContext.Event.findById(id).populate('creator', 'name')
    if (!event) {
      throw new BadRequest('Invalid Id')
    }
    return event
  }

  async create(body) {
    const newEvent = await dbContext.Event.create(body)
    return newEvent.populate('creator', 'name')
  }

  async remove(eventId, userId) {
    const event = await this.getById(eventId)
    if (event.creatorId.toString() !== userId) {
      throw new Forbidden('You are not aloud to delete this event')
    }
    await dbContext.Event.findByIdAndDelete(eventId)
  }

  async edit(body) {
    const event = await this.getById(body.id)
    if (event.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('You are not aloud to edit this event')
    }
    const updateEvent = dbContext.Event.findOneAndUpdate({ _id: body.id }, body, { new: true })
    return await updateEvent
  }
}

export const eventsService = new EventsService()
