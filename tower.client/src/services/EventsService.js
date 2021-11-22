import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService {
    async getAll(eventQuery = "") {
        const res = await api.get('api/events' + eventQuery)
        logger.log(res.data)
        AppState.events = res.data.map(e => new Event(e))
    }

    async getById(id) {
        const res = await api.get('api/events/' + id)
        logger.log(res.data)
        AppState.activeEvent = new Event(res.data)
    }

    async create(event) {
        const res = await api.post('api/events', event)
        logger.log(res.data)
        AppState.events.push(new Event(res.data))
        AppState.activeEvent = new Event(res.data)
    }

    async edit(event) {
        const res = await api.put('api/events/' + event.id, event)
        logger.log(res.data)
        const updatedEvent = new Event(res.data)
        AppState.activeEvent = updatedEvent
        const index = AppState.events.findIndex(e => e.id === updatedEvent.id)
        if (index === -1) {
            AppState.events.push(updatedEvent)
            return
        }
        AppState.events.splice(index, 1, updatedEvent)
    }

    async remove() {
        const res = await api.delete('api/events/' + AppState.activeEvent.id)
        logger.log(res.data)
        AppState.events = AppState.events.filter(c => c.id !== AppState.activeEvent.id)
        AppState.activeEvent = new Event()
    }

}

export const eventsService = new EventsService()