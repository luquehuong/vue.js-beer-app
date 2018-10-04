<template>
  <div class="beer-detail">
    {{ beer.description }}
  </div>
</template>

<script>

export default {
  data () {
    return {
      id: ctx.params.id,
      beer: data[0]
    }
  },
  name: 'id',
  data() {
    return {
      detail:this.$route.params.id,
      title:"id"
    }
  }
}
</script>

<style scoped>
</style>
