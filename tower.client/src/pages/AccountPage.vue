<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="account container-fluid">
    <div class="row cars mt-3">
      <h3>My Events - Hosting</h3>
      <div class="col-md-4" v-for="e in events" :key="e.id">
        <Event :event="e" />
      </div>
    </div>
    <div class="row cars mt-3">
      <h3>My Events - Attending</h3>
      <div v-for="a in myEventsAttending" :key="a.id">
        <Event :attending="a" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { eventsService } from '../services/EventsService'
import { attendeesService } from '../services/AttendeesService'
export default {
  name: 'Account',
  setup() {
    onMounted(() => {
      eventsService.getAll('?accountId=' + AuthService.userInfo.id)
      attendeesService.getAttendeesForAccount()
    })
    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.events),
      myEventsAttending: computed(() => AppState.myEventsAttending)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
