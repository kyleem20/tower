import { AppState } from "../AppState"
import { AccountAttendee, EventAttendee } from "../Models/Attendees"
import { router } from "../router"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class AttendeesService {

    async getAttendeesForAccount() {
        const res = await api.get('account/attendees')
        logger.log('accountAttendee', res.data)
        AppState.myEventsAttending = res.data.map(a => new EventAttendee(a))
    }

    async getAttendeesForEvent(eventId) {
        const res = await api.get(`api/events/${eventId}/attendees`)
        logger.log('eventAttendees', res.data)
        AppState.attendees = res.data.map(a => new AccountAttendee(a))
    }

    async create(accountId, eventId) {
        await api.post('api/attendees/', data)
        AppState.myEventsAttending = new EventAttendee(accountId)
        AppState.attendees.push(new AccountAttendee(eventId))
        router.push({ path: '/events/' + eventId })
    }

    async remove(id) {
        const res = await api.delete('api/attendees/' + id)
        AppState.attendees = AppState.attendees.filter(a => a.attendeeId !== id)
    }
}

export const attendeesService = new AttendeesService()