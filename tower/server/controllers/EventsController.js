import { Auth0Provider } from '@bcwdev/auth0provider'
import { eventsService } from '../services/EventsService'
import BaseController from '../utils/BaseController'

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)

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

//   constructor() {
//     super('api/events')
//     this.router
//       .get('', this.getAll)
//       .get('/:id', this.getById)
//       .get('/:id/attendees', this.getAttendees)
//       .use(Auth0Provider.getAuthorizedUserInfo)
//       .post('', this.create)
//       .put('/:id', this.edit)
//       .delete('/:id', this.remove)
//   }

//   async getAll(req, res, next) {
//     try {
//       const query = req.query
//       // query.creatorId = req.userInfo.id
//       const events = await eventsService.getAll(query)
//       return res.send(events)
//     } catch (error) {
//       next(error)
//     }
//   }

//   async getById(req, res, next) {
//     try {
//       const events = await eventsService.getById(req.params.id)
//       return res.send(events)
//     } catch (error) {
//       next(error)
//     }
//   }

//   async getAttendees(req, res, next) {
//     try {
//       const attendees = await attendeesService.getById(req.params.id)
//       return res.send(attendees)
//     } catch (error) {
//       next(error)
//     }
//   }

//   async create(req, res, next) {
//     try {
//       req.body.creatorId = req.userInfo.id
//       const events = await eventsService.create(req.body)
//       return res.send(events)
//     } catch (error) {
//       next(error)
//     }
//   }

//   async remove(req, res, next) {
//     try {
//       const id = req.params.id
//       const canceledEvent = await eventsService.edit(id, { isCanceled: true })
//       return res.send(canceledEvent)
//     } catch (error) {
//       next(error)
//     }
//   }

//   async edit(req, res, next) {
//     try {
//       const id = req.params.id
//       const updateData = req.body
//       updateData.id = id
//       delete updateData.isCanceled
//       const updatedEvent = await eventsService.edit(id, updateData)
//       return res.send(updatedEvent)
//     } catch (error) {
//       next(error)
//     }
//   }
// }
