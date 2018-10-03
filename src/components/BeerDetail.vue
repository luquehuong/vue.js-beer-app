<template>
  <div>
    <div v-if="beer">{{ beer.description }}</div>
  </div>
</template>
<script>
export default {
  props: {
    beer: {
      type: Object,
      default: () => null
    }
  }
};
</script>
<style scoped>
</style>


