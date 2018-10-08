<template>
  <div>
    <div v-if="beer">{{ beer.description }}</div>
    <div v-if="beer"><img class="img" :src="beer.image_url"></div>
  </div>
</template>
<script>
import '@/assets/styles/tailwind.css';
import '@/assets/styles/main.css';
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
