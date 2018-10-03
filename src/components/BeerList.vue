<template>
  <div>
    <ul v-for="beer in list"
          :key="beer.id">
      <li @click="chooseBeer(beer)">{{ beer.name }}</li>
    </ul>
  </div>
</template>

<script type = "text/javascript">
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    chooseBeer(beer) {
      this.$emit("chooseBeer", beer);
    }
  }
};
</script>
<style scoped>
</style>
