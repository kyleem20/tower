import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .get('/:id/comments', this.getComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.remove)
      .put('/:id', this.attend)
  }

  async getComments(req, res, next) {
    try {
      const comments = await commentsService.getComments({ eventId: req.params.id })
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newComment = await commentsService.create(req.body)
      return res.send(newComment)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const commentId = req.params.id
      const userId = req.userInfo.id
      await commentsService.remove(commentId, userId)
      return res.send('Comment Deleted')
    } catch (error) {
      next(error)
    }
  }

  async attend(req, res, next) {
    try {
      const eventId = req.params.id
      await commentsService.isAttending(eventId, req.body)
      return res.send('Is Attending')
    } catch (error) {
      next(error)
    }
  }
}

//   constructor() {
//     super('api/comments')
//     this.router
//       .use(Auth0Provider.getAuthorizedUserInfo)
//       .get('', this.getAll)
//       .get('/:id', this.getById)
//       .post('', this.create)
//       .put('/:id', this.edit)
//       .delete('/:id', this.remove)
//   }

//   async create(req, res, next) {
//     try {
//       req.body.creatorId = req.userInfo.id
//       const comment = await commentsService.create(req.body)
//       return res.send(comment)
//     } catch (error) {
//       next(error)
//     }
//   }

//   async getAll(req, res, next) {
//     try {
//       const query = req.query
//       query.creatorId = req.userInfo.id
//       const comments = await commentsService.getAll(query)
//       return res.send(comments)
//     } catch (error) {
//       next(error)
//     }
//   }

//   async getById(req, res, next) {
//     try {
//       const comment = await commentsService.getById(req.params.id)
//       return res.send(comment)
//     } catch (error) {
//       next(error)
//     }
//   }

//   async remove(req, res, next) {
//     try {
//       const userId = req.userInfo.id
//       const commentId = req.params.id
//       await commentsService.remove(commentId, userId)
//       res.send('You have deleted this comment')
//     } catch (error) {
//       next(error)
//     }
//   }

//   async edit(req, res, next) {
//     try {
//       req.body.creatorId = req.userInfo.id
//       req.body.id = req.params.id
//       const comment = await commentsService.edit(req.body)
//       return res.send(comment)
//     } catch (error) {
//       next(error)
//     }
//   }
// }
