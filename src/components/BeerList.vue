<template>
  <div>
    <div
      v-for="beer in list"
      :key="beer.id"
    >
      <router-link
        :to="{name:'detail',params:{id:beer.id}}"
      >
        {{ beer.name }}
      </router-link>
    </div>
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
    }
  }
};
</script>
<style scoped>
</style>
