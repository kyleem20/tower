<template>
  <div class="eventDetails container-fluid">
    <div class="row">
      <div class="col-12">
        <h2>{{ event.name }}</h2>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
import { eventsService } from '../services/EventsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    onMounted(async () => {
      logger.log('Event Id', route.params.id)
      try {
        await eventsService.getById(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast('Could not get the event', 'error')
        router.push({ name: 'Events' })
      }
    })
    return {
      event: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      async remove() {
        try {
          if (await Pop.confirm()) {
            await eventsService.remove()
            router.push({ name: 'Events' })
          }
        } catch (error) {
          logger.error(error)
          Pop.toast('Failed to cancel event', 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>