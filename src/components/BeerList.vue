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
        <font-awesome-icon class="float-right" icon="trash" size="xs" />
      </router-link>
    </div>
  </div>
</template>

<script>
import '@/assets/styles/tailwind.css';
import '@/assets/styles/main.css';
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
