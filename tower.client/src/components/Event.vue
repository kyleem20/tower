<template>
  <div class="selectable">
    <router-link :to="{ name: 'EventDetails', params: { id: event.id } }">
      <div class="card p-3 m-2">
        <h2>{{ event.name }}</h2>
        <h5>{{ event.startDate }}</h5>
        <h5>{{ event.location }}</h5>
        <h5>Remaining Seats: {{ event.capacity }}</h5>
      </div>
    </router-link>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
  props: { event: { type: Object, required: true } },
  setup() {
    return {
    }
  }
}
</script>


<style lang="scss" scoped>
</style>