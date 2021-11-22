import { dbContext } from '../db/DbContext'
import { Forbidden } from '../utils/Errors'

class CommentsService {
  async create(data) {
    const newComment = await dbContext.Comments.create(data)
    await newComment.populate('account', 'event')
    return newComment
  }

  async getComments(query = {}) {
    const comments = await dbContext.Comments.find(query).populate('account', 'event')
    return comments
  }

  async remove(id, userId) {
    const found = await dbContext.Comments.findById(id)
    if (found.accountId.toString() !== userId) {
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

//   constructor() {
//     logger.log('comment service is here')
//   }

//   async create(body) {
//     const newComment = await dbContext.Comments.create(body)
//     return newComment.populate('creator', 'name')
//   }

//   async getAll(query = {}) {
//     return await dbContext.Comments.find(query).populate('creator', 'name')
//   }

//   async getById(id) {
//     const comment = await dbContext.Comments.findById(id).populate('creator', 'name')
//     if (!comment) {
//       throw new BadRequest('Invalid Id')
//     }
//     return comment
//   }

//   async remove(commentId, userId) {
//     const comment = await this.getById(commentId)
//     if (comment.creatorId.toString() !== userId) {
//       throw new Forbidden('You are not aloud to delete this comment')
//     }
//     await dbContext.Comments.findByIdAndDelete(commentId)
//   }

//   async edit(body) {
//     const comment = await this.getById(body.id)
//     if (comment.creatorId.toString() !== body.creatorId) {
//       throw new Forbidden('You are not aloud to edit this comment')
//     }
//     const updateComment = dbContext.Comments.findOneAndUpdate({ _id: body.id }, body, { new: true })
//     return await updateComment
//   }
// }
