<template>
  <div class="CreateEvent">
    <form @submit.prevent="createEvent()">
      <label class="me-2">Category </label>
      <select v-model="event.type" title="select a type" class="selectable">
        <option>concert</option>
        <option>digital</option>
        <option>convention</option>
        <option>sport</option>
      </select>
      <input
        class="form-control m-1"
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        required
        v-model="event.name"
      />
      <textarea
        class="form-control m-1"
        name="description"
        id="description"
        placeholder="Description"
        required
        v-model="event.description"
      ></textarea>
      <input
        title="date"
        type="date"
        name="date"
        id="date"
        class="form-control m-1 selectable"
        required
        v-model="event.startDate"
      />
      <input
        type="text"
        class="form-control m-1"
        name="location"
        id="location"
        placeholder="Location"
        required
        v-model="event.location"
      />
      <input
        type="number"
        name="capacity"
        id="capacity"
        min="1"
        class="form-control m-1"
        required
        placeholder="Total Seats"
        v-model="event.capacity"
      />

      <input
        type="url"
        name="cover image "
        id="cover image"
        class="form-control m-1"
        placeholder="Image"
        required
        v-model="event.coverImg"
      />
      <button type="submit" title="submit">submit</button>
    </form>
  </div>
</template>


<script>
import { Modal } from "bootstrap"
import { useRoute, useRouter } from "vue-router"
import { eventsService } from "../services/EventsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { ref } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const event = ref({})
    return {
      route,
      router,
      event,
      async createEvent() {
        try {
          await eventsService.create(event.value)
          Modal.getOrCreateInstance(document.getElementById("CreateEvent")).hide()
          router.push({ name: 'EventDetailsPage', params: { id: AppState.activeEvent.id } })


        } catch (error) {
          logger.error(error)
          Pop.toast(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>