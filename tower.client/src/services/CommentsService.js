import { AppState } from "../AppState"
import { api } from "./AxiosService"

class CommentsService {
    async getAll(eventId) {
        const res = await api.get(`api/events/${eventId}/comments`)
        AppState.comments = res.data
    }
    async create(eventId, commentId) {
        const res = await api.post(`api/events/${eventId}/comments`, commentId)
        AppState.comments.unshift(res.data)
    }
    async getCommentId(eventId, commentId) {
        const res = await api.get(`api/events/${eventId}/comments/${commentId}`)
        AppState.comments = res.data
    }

    async remove(commentId, eventId) {
        const res = await api.delete(`api/events/${eventId}/comments/${commentId}`)
        AppState.comments.filter(c => c.commentId !== commentId)
        AppState.comments = AppState.comments
    }
}

export const commentsService = new CommentsService()