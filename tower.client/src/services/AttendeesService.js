import { AppState } from "../AppState"
import { AccountAttendee, EventAttendee } from "../Models/Attendees"
import { router } from "../router"
import { logger } from "../utils/Logger"
import { accountService } from "./AccountService"
import { api } from "./AxiosService"
import { eventsService } from "./EventsService"

class AttendeesService {

    async getAttendeesForAccount() {
        const res = await api.get('account/attendees')
        logger.log('accountAttendee', res.data)
        AppState.myEventsAttending = res.data
    }

    async getAttendeesForEvent(eventId) {
        const res = await api.get(`api/events/${eventId}/attendees`)
        logger.log('eventAttendees', res.data)
        AppState.attendees = res.data
    }

    async create(accountId, eventId) {
        const res = await api.post('api/attendees', { accountId: accountId, eventId: eventId })
        AppState.attendees = [...AppState.attendees, res.data]
        // eventsService.getActiveEvent(eventId)
        // await api.post('api/attendees/', data)
        // AppState.myEventsAttending = new EventAttendee(accountId)
        // AppState.attendees.push(new AccountAttendee(eventId))
    }

    async remove(id) {
        const res = await api.delete('api/attendees/' + id)
        AppState.attendees = AppState.attendees.filter(a => a.attendeeId !== id)
        accountService.getAttendeesForAccount(id)
    }
}

export const attendeesService = new AttendeesService()