<template>
  <div class="component"></div>
</template>


<script>
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { commentsService } from '../services/CommentsService'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const eventId = route.params.id
    return {
      async removeComment(commentId) {
        try {
          if (eventId) {
            await commentsService.remove(commentId, eventId)
          }
        } catch (error) {
          logger.log(error)
          Pop.toast("Cannot delete this comment", "error")
        }
        return commentsService.getAll()
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>