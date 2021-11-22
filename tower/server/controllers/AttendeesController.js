import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeesService } from '../services/AttendeesService'
import BaseController from '../utils/BaseController'

export class AttendeesController extends BaseController {
  constructor() {
    super('api/attendees')
    this.router
      // .get('/:id/attendees', this.getAttendeesEvents)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/', this.create)
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
