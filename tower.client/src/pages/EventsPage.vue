<template>
  <div class="events container-fluid">
    <!-- <div class="row">
      <div class="col d-flex justify-content-between p-3">
        <h2>Cars</h2>
        <button
          class="btn btn-outline-success"
          data-bs-toggle="modal"
          data-bs-target="#car-modal"
        >
          <i class="mdi mdi-plus"></i>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4" v-for="c in cars" :key="c.id">
        <Car :car="c" />
      </div>
    </div> -->
    <div class="row">
      <div class="col-md-3 text-dark p-2" v-for="e in events" :key="e.id">
        <Event :event="e" />
      </div>
    </div>
  </div>
  <!-- <CarFormModal /> -->
</template>


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
      events: computed(() => AppState.events)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>