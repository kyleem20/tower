import { dbContext } from '../db/DbContext'
import { logger } from '../utils/Logger'
import { BadRequest, Forbidden } from '../utils/Errors'

class CommentsService {
  constructor() {
    logger.log('comment service is here')
  }

  async getAll(query = {}) {
    return await dbContext.Comment.find(query).populate('creator', 'name')
  }

  async getById(id) {
    const comment = await dbContext.Comment.findById(id).populate('creator', 'name')
    if (!comment) {
      throw new BadRequest('Invalid Id')
    }
    return comment
  }

  async create(body) {
    const newComment = await dbContext.Comment.create(body)
    return newComment.populate('creator', 'name')
  }

  async remove(commentId, userId) {
    const comment = await this.getById(commentId)
    if (comment.creatorId.toString() !== userId) {
      throw new Forbidden('You are not aloud to delete this comment')
    }
    await dbContext.Comment.findByIdAndDelete(commentId)
  }

  async edit(body) {
    const comment = await this.getById(body.id)
    if (comment.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('You are not aloud to edit this comment')
    }
    const updateComment = dbContext.Comment.findOneAndUpdate({ _id: body.id }, body, { new: true })
    return await updateComment
  }
}

export const commentsService = new CommentsService()
