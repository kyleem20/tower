<template>
  <router-link :to="{ name: 'EventDetails', params: { id: event.id } }">
    <div class="text-dark selectable card p-3 m-2" @click="setActiveEvent()">
      <img class="img-fluid h-50" :src="event.coverImg" alt="event image" />
      <p v-if="event.capacity == 0" class="mt-4 bg-warning p-1">
        Sorry, This event if full.
      </p>
      <p v-if="event.isCanceled" class="mt-4 bg-info p-1">
        This event is canceled
      </p>
      <h2>{{ event.name }}</h2>
      <h6 class="text-uppercase text-dark lighten-60">{{ event.type }}</h6>
      <h5>{{ new Date(event.startDate).toDateString() }}</h5>
      <h5>{{ event.location }}</h5>

      <p v-if="event.capacity > 0">Remaining Seats: {{ event.capacity }}</p>
    </div>
  </router-link>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
  props: { event: { type: Object } },
  setup(props) {
    return {
      activeEvent: computed(() => AppState.activeEvent),
      myEventsAttending: computed(() => AppState.myEventsAttending),
      setActiveEvent() {
        AppState.activeEvent = props.event
      },
      myEventsAttending: computed(() => {
        if (AppState.account.id) {
          let found = AppState.attendees.find(a => a.accountId === AppState.account.id)
          return found ? true : false
        }
        return false
      })
    }
  }
}
</script>


<style lang="scss" scoped>
</style>