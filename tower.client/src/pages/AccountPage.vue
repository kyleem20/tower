<template>
  <div class="account container-fluid">
    <div class="about text-center">
      <h1 class="m-1">
        Welcome {{ account.name }}
        <img class="rounded-pill" :src="account.picture" alt="" />
      </h1>
    </div>
    <div class="row cars mt-3">
      <h3>My Events - Hosting</h3>
      <div class="col-md-4" v-for="e in events" :key="e.id">
        <Event :event="e" />
      </div>
    </div>
    <div class="row cars mt-3">
      <h3>My Events - Attending</h3>
      <div
        class="col-md-4"
        v-for="attendee in myEventsAttending"
        :key="attendee.id"
      >
        <div class="card m-2 p-3">
          <img
            class="img-fluid fix"
            :src="attendee.event.coverImg"
            alt="event image"
          />
          <h5>Event type: {{ attendee.event.type }}</h5>
          <h3>{{ attendee.event.name }}</h3>

          <h5>{{ new Date(attendee.event.startDate).toDateString() }}</h5>
          <h5>{{ attendee.event.location }}</h5>
          <p v-if="attendee.event.capacity > 0">
            Capacity left: {{ attendee.event.capacity }}
          </p>
          <p v-if="attendee.event.capacity == 0" class="cancel">
            This event if full
          </p>
          <p>{{ attendee.event.description }}</p>
          <div v-if="attendee.event.isCanceled">
            <h6 class="cancel">This event is canceled</h6>
          </div>
          <button
            class="rounded m-2 bg-info"
            title="return your ticket"
            @click="leaveEvent(attendee.id)"
          >
            Leave Event
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { eventsService } from '../services/EventsService'
import { attendeesService } from '../services/AttendeesService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { accountService } from '../services/AccountService'
export default {
  name: 'Account',
  setup() {
    watchEffect(async (account) => {
      try {
        await accountService.getMyAttendance(account)
      } catch (error) {
        logger.error(error)
        Pop.toast(error)
      }
    })
    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.events),
      myEventsAttending: computed(() => AppState.myEventsAttending),

      async leaveEvent(attendee) {
        try {
          if (await Pop.confirm('Do you wish to leave this event?')) {
            await attendeesService.remove(attendee)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
