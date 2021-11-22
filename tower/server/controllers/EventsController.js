import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeesService } from '../services/AttendeesService'
import { commentsService } from '../services/CommentsService'
import { eventsService } from '../services/EventsService'
import BaseController from '../utils/BaseController'

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/attendees', this.getAttendees)
      .get('/:id/comments', this.getComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.cancelEvent)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const events = await eventsService.getAll(query)
      res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getAttendees(req, res, next) {
    try {
      const attendee = await attendeesService.getAttendeesByEvents(req.params.id)
      res.send(attendee)
    } catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      const attendee = await commentsService.getComments(req.params.id)
      res.send(attendee)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const event = await eventsService.getById(req.params.id)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.create(req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      delete req.body.isCanceled
      const event = await eventsService.update(req.params.id, req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const eventId = req.params.id
      const creatorId = req.userInfo.id
      const deletedEvent = await eventsService.update(eventId, { creatorId: creatorId, isCanceled: true })
      return res.send(deletedEvent)
    } catch (error) {
      next(error)
    }
  }
}
