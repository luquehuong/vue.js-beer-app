<template>
  <div>
    <div
      v-for="beer in list"
      :key="beer.id"
    >
      <beer 
      :beer="beer"
      @deleteBeer="deleteBeer">
      </beer>
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
  methods: {
    deleteBeer(beer) {
      this.$emit('deleteBeer', beer);
    }
  }
}
</script>
<style scoped>
</style>
