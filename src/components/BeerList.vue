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
  data() {
    return {
      searchQuery: '',
      results: []
    }
  },
  methods: {
    chooseBeer(beer) {
      this.$emit("chooseBeer", beer);
    }
  },
  watch: {
    searchQuery(query) {
      console.log(query)
      this.results = results
      this.$emit('searchBeer', results)
    }
  }
};
</script>
<style scoped>
</style>
