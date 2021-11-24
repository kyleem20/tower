<template>
  <router-link :to="{ name: 'EventDetails', params: { id: event.id } }">
    <div class="text-dark selectable card p-3 m-2" @click="setActiveEvent()">
      <img class="img-fluid h-50" :src="event.coverImg" alt="event image" />
      <p v-if="event.capacity == 0" class="mt-4 bg-warning p-1">
        Sorry, This event if full.
      </p>
      <p v-if="event.isCanceled" class="mt-4 bg-danger p-1">
        This event is canceled
      </p>
      <h2>{{ event.name }}</h2>
      <h5>{{ event.startDate }}</h5>
      <h5>{{ event.location }}</h5>
      <h5>Remaining Seats: {{ event.capacity }}</h5>
      <p v-if="event.capacity > 0">Remaining Seats: {{ event.capacity }}</p>
    </div>
  </router-link>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
  props: { event: { type: Object, required: true } },
  setup() {
    return {
      activeEvent: computed(() => AppState.activeEvent),
      setActiveEvent(props) {
        AppState.activeEvent = props.event
      },
    }
  }
}
</script>


<style lang="scss" scoped>
</style>