<template>
  <div class="eventDetails container-fluid">
    <div class="row">
      <div class="col-12 p-4">
        <img
          class="img-fluid h-50"
          :src="activeEvent.coverImg"
          alt="event image"
        />
        <p v-if="activeEvent.isCanceled" class="mt-4 bg-info p-1">
          This event is canceled
        </p>
        <p v-if="activeEvent.capacity == 0" class="mt-4 bg-warning p-1">
          Sorry, This event if full.
        </p>
        <h2>{{ activeEvent.name }}</h2>
        <h6>{{ activeEvent.type }}</h6>
        <p>{{ activeEvent.description }}</p>
        <p v-if="activeEvent.capacity > 0">
          Remaining Seats: {{ activeEvent.capacity }}
        </p>
        <button
          class="btn btn-success disable"
          v-if="myEventsAttending.eventId !== activeEvent.id"
          @click="attendEvent(account.id, activeEvent.id)"
        >
          Attend
        </button>
        <button
          title="Cancel Event"
          class="btn btn-danger rounded mx-2"
          v-if="
            activeEvent.creatorId == account.id &&
            !activeEvent.isCanceled &&
            account.id
          "
          @click="remove(activeEvent)"
        >
          Cancel
        </button>
      </div>
      <div class="col-12" v-for="attendee in attendees" :key="attendee.id">
        {{ attendee.account.email }}
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
import { eventsService } from '../services/EventsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { attendeesService } from '../services/AttendeesService'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    onMounted(async () => {
      logger.log('Event Id', route.params.id)
      try {
        if (route.params.id) {
          await eventsService.setActiveEvent(route.params.id)
          await attendeesService.getAttendeesForEvent(route.params.id)

        }
      } catch (error) {
        logger.error(error)
        Pop.toast('Could not get the event', 'error')
        router.push({ name: 'Events' })
      }
    })
    return {
      activeEvent: computed(() => AppState.activeEvent),
      myEventsAttending: computed(() => AppState.myEventsAttending),
      account: computed(() => AppState.account),
      attendees: computed(() => AppState.attendees),
      async remove() {
        try {
          if (await Pop.confirm("Do you want to cancel this event?")) {
            await eventsService.remove()
            router.push({ name: 'Events' })
          }
        } catch (error) {
          logger.error(error)
          Pop.toast('Failed to cancel event', 'error')
        }
      },
      async attendEvent(accountId, eventId) {
        try {
          await attendeesService.create(accountId, eventId)
          logger.error(error)
          Pop.toast('Attend Successful', 'success')

        } catch (error) {
          Pop.toast('Failed to attend event', 'error')
        }
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