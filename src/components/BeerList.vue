<template>
  <div>
    <div>
      <router-link
        :to="{name:'random'}"
      >
        Random Beers
      </router-link>
    </div>
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
  }
};
</script>
<style scoped>
</style>
