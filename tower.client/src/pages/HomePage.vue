<template>
  <div class="events container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="row text-center bg-dark lighten-40 p-2">
          <div class="col-md-3 selectable" @@click="filtered = 'concert'">
            Concert
          </div>
          <div class="col-md-3 selectable" @click="filtered = 'digital'">
            Digital
          </div>
          <div class="col-md-3 selectable" @click="filtered = 'sport'">
            Sport
          </div>
          <div class="col-md-3 selectable" @click="filtered = 'convention'">
            Convention
          </div>
        </div>
      </div>
      <div class="col-md-3 text-dark p-2" v-for="e in events" :key="e.id">
        <Event :event="e" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { eventsService } from '../services/EventsService'
import { AppState } from '../AppState'
// TODO Fix filter, error "computed value is readonly"
export default {
  name: 'Home',
  setup() {
    const filtered = ref('')
    onMounted(async () => {
      try {
        await eventsService.getAll()
      } catch (error) {
        logger.log(error)
        Pop.toast('Something went wrong', 'error')
      }
    })
    return {
      // filtered,
      filtered: computed(() => AppState.events.filter(e => e.type === filtered.type)),
      events: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped lang="scss">
// .home {
//   display: grid;
//   height: 80vh;
//   place-content: center;
//   text-align: center;
//   user-select: none;
//   .home-card {
//     width: 50vw;
//     > img {
//       height: 200px;
//       max-width: 200px;
//       width: 100%;
//       object-fit: contain;
//       object-position: center;
//     }
//   }
// }
</style>
