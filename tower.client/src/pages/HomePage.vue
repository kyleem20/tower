<template>
  <div class="events container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-2 selectable" @click="filterSelection('concert')">
            Concert
          </div>
          <div class="col-md-2 selectable">Digital</div>
          <div class="col-md-2 selectable">Sport</div>
          <div class="col-md-2 selectable">Convention</div>
        </div>
      </div>
      <div class="col-md-3 text-dark p-2" v-for="e in events" :key="e.id">
        <Event :event="e" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { eventsService } from '../services/EventsService'
import { AppState } from '../AppState'

export default {
  name: 'Home',
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
      filterSelection() {

      }
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
