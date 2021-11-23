import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService {
    async getAll() {
        const res = await api.get('api/events')
        logger.log(res.data)
        // AppState.events = res.data.map(e => new Event(e))
        AppState.events = res.data

    }
    setActiveEvent(id) {
        const found = AppState.events.find(e => e.id === id)
        if (!found) {
            throw new Error('Invalid Event Id')
        }
        AppState.activeEvent = found
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