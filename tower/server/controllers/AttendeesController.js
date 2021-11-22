import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeesService } from '../services/AttendeesService'
import BaseController from '../utils/BaseController'

export class AttendeeController extends BaseController {
  constructor() {
    super('api/attendees')
    this.router
      .get('/:id/attendees', this.getAttendeesEvents)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.remove)
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const attendee = await attendeesService.create(req.body)
      return res.send(attendee)
    } catch (error) {
      next(error)
    }
  }

  async getAttendeesEvents(req, res, next) {
    try {
      const events = await attendeesService.getAttendeesEvents({ eventId: req.params.id })
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const attendeeId = req.params.id
      const userId = req.userInfo.id
      await attendeesService.remove(attendeeId, userId)
      return res.send('Attendee removed')
    } catch (error) {
      next(error)
    }
  }
}

//   constructor() {
//     super('api/attendees')
//     this.router
//       .use(Auth0Provider.getAuthorizedUserInfo)
//       // .get('', this.getAll)
//       .get('/:id', this.getById)
//       .post('', this.create)
//       .put('/:id', this.edit)
//       .delete('/:id', this.remove)
//   }

//   async create(req, res, next) {
//     try {
//       req.body.accountId = req.userInfo.id
//       const attendee = await attendeesService.create(req.body)
//       return res.send(attendee)
//     } catch (error) {
//       next(error)
//     }
//   }

//   // async getAll(req, res, next) {
//   //   try {
//   //     const query = req.query
//   //     query.creatorId = req.userInfo.id
//   //     const attendees = await attendeesService.getAll(query)
//   //     return res.send(attendees)
//   //   } catch (error) {
//   //     next(error)
//   //   }
//   // }

//   async getById(req, res, next) {
//     try {
//       const attendee = await attendeesService.getById(req.params.id)
//       return res.send(attendee)
//     } catch (error) {
//       next(error)
//     }
//   }

//   async remove(req, res, next) {
//     try {
//       const userId = req.userInfo.id
//       const attendeeId = req.params.id
//       await attendeesService.remove(attendeeId, userId)
//       res.send('You have removed this attendee')
//     } catch (error) {
//       next(error)
//     }
//   }

//   async edit(req, res, next) {
//     try {
//       req.body.accountId = req.userInfo.id
//       req.body.id = req.params.id
//       const attendee = await attendeesService.edit(req.body)
//       return res.send(attendee)
//     } catch (error) {
//       next(error)
//     }
//   }
//   //   async edit(req, res, next) {
//   //     try {
//   //       req.body.bidderId = req.userInfo.id
//   //       req.body.id = req.params.id
//   //       const bid = await bidsService.edit(req.body)
//   //       res.send(bid)
//   //     } catch (error) {
//   //       next(error)
//   //     }
//   //   }
// }
