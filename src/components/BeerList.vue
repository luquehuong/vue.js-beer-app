<template>
  <div>
    <div
      v-for="beer in list" track-by='$index'
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
import Cart from '@/components/Cart';

export default {
  components: {
    Beer,
    Cart
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    beer: {
      type: Object,
      default: () => null
    },
    cart: {
      type: Array,
      default: () => []
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
