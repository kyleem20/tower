import { dbContext } from '../db/DbContext'
import { Forbidden } from '../utils/Errors'

class CommentsService {
  async create(body) {
    const newComment = await dbContext.Comments.create(body)
    await newComment.populate('creator', 'event')
    return newComment
  }

  async getComments(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'event')
    return comments
  }

  async remove(id, userId) {
    const found = await dbContext.Comments.findById(id)
    if (found.creatorId.toString() !== userId) {
      throw new Forbidden('You cannot delete this comment')
    }
    await dbContext.Comments.findByIdAndDelete(id)
  }

  async isAttending(eventId, bool) {
    const update = { isAttending: bool }
    await dbContext.Comments.findOneAndUpdate({ eventId: eventId }, update)
  }
}
export const commentsService = new CommentsService()
