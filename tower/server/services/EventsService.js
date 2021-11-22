import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class EventsService {
  async getAll(query = {}) {
    const events = await dbContext.Events.find(query)
      .populate('creator')
    return events
  }

  async getById(id) {
    const event = await dbContext.Events.findById(id)
      .populate('creator')
    if (!event) {
      throw new BadRequest('Invalid Event Id')
    }
    return event
  }

  async create(body) {
    const event = await dbContext.Events.create(body)
    await event.populate('creator')
    return event
  }

  async update(id, body) {
    const event = await this.getById(id)
    if (event.creatorId.toString() !== body.creatorId || event.isCanceled === true) {
      throw new Forbidden('Cannot edit this event!')
    }
    const update = await dbContext.Events.findByIdAndUpdate(id, body, { new: true })
    return update
  }

  async capacity(id) {
    const update = await dbContext.Events.findById(id)
    if (update.capacity <= 0) {
      throw new BadRequest('This event is full')
    }
    update.capacity--
    const updated = await dbContext.Events.findByIdAndUpdate(id, update, { new: true })
    return updated
  }

  async capacityDecrease(id) {
    const update = await dbContext.Events.findById(id)
    update.capacity++
    const updated = await dbContext.Events.findByIdAndUpdate(id, update, { new: true })
    return updated
  }
}
export const eventsService = new EventsService()
