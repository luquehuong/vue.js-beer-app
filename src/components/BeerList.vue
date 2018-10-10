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
        <span v-on:click="deleteBeer(beer)">
          <font-awesome-icon class="float-right" icon="trash" size="xs" />
        </span>
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
    },
    beer: {
      type: Object,
      default: () => null
    }
  }
};
</script>
<style scoped>
</style>
