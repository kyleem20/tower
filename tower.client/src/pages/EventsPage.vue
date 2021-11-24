<template></template>


<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { eventsService } from '../services/EventsService'
import { AppState } from '../AppState'

export default {
  setup() {
    onMounted(async () => {
      try {
        await eventsService.getAll()
      } catch (error) {
        logger.log(error)
        Pop.toast('Something went wrong', 'error')
      }
    })
    return {
      events: computed(() => AppState.events),

    }
  }
}
</script>


<style lang="scss" scoped>
</style>