<template>
  <div>
    <div
      v-for="beer in list"
      :key="beer.id"
    >
      <beer :beer="beer"></beer>
    </div>
  </div>
</template>

<script>
import '@/assets/styles/tailwind.css';
import '@/assets/styles/main.css';
import Beer from '@/components/Beer';

export default {
  components: {
    Beer,
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    beer: {
      type: Object,
      default: () => null
    }
  },
}
</script>
<style scoped>
</style>
