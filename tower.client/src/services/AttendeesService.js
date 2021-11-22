import { AppState } from "../AppState"
import { AccountAttendee, EventAttendee } from "../Models/Attendees"
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

    async create(attendee) {
        await api.post('api/attendees/', attendee)
        AppState.myEventsAttending = new EventAttendee(res.data)
        AppState.attendees.push(new AccountAttendee(res.data))
    }

    async remove(id) {
        const res = await api.delete('api/attendees/' + id)
        AppState.attendees = AppState.attendees.filter(a => a.attendeeId !== id)
    }
}

export const attendeesService = new AttendeesService()