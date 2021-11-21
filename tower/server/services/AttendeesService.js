import { dbContext } from '../db/DbContext'
import { logger } from '../utils/Logger'
import { BadRequest, Forbidden } from '../utils/Errors'

class AttendeesService {
  constructor() {
    logger.log('attendee service is here')
  }

  async getAll(query = {}) {
    return await dbContext.Attendee.find(query).populate('creator', 'name')
  }

  async getById(id) {
    const attendee = await dbContext.Attendee.findById(id).populate('creator', 'name')
    if (!attendee) {
      throw new BadRequest('Invalid Id')
    }
    return attendee
  }

  async create(body) {
    const newAttendee = await dbContext.Attendee.create(body)
    return newAttendee.populate('creator', 'name')
  }

  async remove(attendeeId, userId) {
    const attendee = await this.getById(attendeeId)
    if (attendee.creatorId.toString() !== userId) {
      throw new Forbidden('You are not aloud to delete this attendee')
    }
    await dbContext.Attendee.findByIdAndDelete(attendeeId)
  }

  async edit(body) {
    const attendee = await this.getById(body.id)
    if (attendee.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('You are not aloud to edit this attendee')
    }
    const updateAttendee = dbContext.Attendee.findOneAndUpdate({ _id: body.id }, body, { new: true })
    return await updateAttendee
  }
}

export const attendeesService = new AttendeesService()
