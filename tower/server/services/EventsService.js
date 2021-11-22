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
      throw new BadRequest('Invalid Id')
    }
    return event
  }

  async create(data) {
    const event = await dbContext.Events.create(data)
    await event.populate('creator')
    return event
  }

  async update(id, data) {
    const event = await this.getById(id)
    if (event.creatorId.toString() !== data.creatorId || event.isCanceled === true) {
      throw new Forbidden('Cannot edit this event!')
    }
    const update = await dbContext.Events.findByIdAndUpdate(id, data, { new: true })
    return update
  }

  async capacity(id) {
    const update = await dbContext.Events.findById(id)
    if (update.capacity <= 0) {
      throw new BadRequest('This Event is Full')
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

// class EventsService {
//   async getAll(query = {}) {
//     const events = await dbContext.Events.find(query)
//       .populate('creator')
//     return events
//   }

//   async getById(id) {
//     const event = await dbContext.Events.findById(id)
//       .populate('creator')
//     if (!event) {
//       throw new BadRequest('Invalid Id')
//     }
//     return event
//   }

//   async create(data) {
//     const event = await dbContext.Events.create(data)
//     await event.populate('creator')
//     return event
//   }

//   async update(id, data) {
//     const event = await this.getById(id)
//     if (event.creatorId.toString() !== data.creatorId || event.isCanceled === true) {
//       throw new Forbidden('Cannot edit this event!')
//     }
//     const update = await dbContext.Events.findByIdAndUpdate(id, data, { new: true })
//     return update
//   }

//   async capacity(id) {
//     const update = await dbContext.Events.findById(id)
//     if (update.capacity <= 0) {
//       throw new BadRequest('This Event is Full')
//     }
//     update.capacity--
//     const updated = await dbContext.Events.findByIdAndUpdate(id, update, { new: true })
//     return updated
//   }

//   async capacityDecrease(id) {
//     const update = await dbContext.Events.findById(id)
//     update.capacity++
//     const updated = await dbContext.Events.findByIdAndUpdate(id, update, { new: true })
//     return updated
//   }
// }
