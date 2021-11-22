<template>
  <div class="selectable">
    <router-link :to="{ name: 'EventDetails', params: { id: event.id } }">
      <h2>{{ event.name }}</h2>
    </router-link>
  </div>
</template>


<script>
export default {
  props: { event: { type: Object, required: true } },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>