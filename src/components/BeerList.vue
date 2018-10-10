<template>
  <div>
    <div v-show="!isEditing"
      v-for="beer in list"
      :key="beer.id"
    >
      <span v-on:click="deleteBeer(beer)">
        <i><font-awesome-icon class="float-right" icon="trash" size="xs" /></i>
      </span>
      <span v-on:click="showForm">
        <i><font-awesome-icon class="float-right" icon="edit" size="xs" /></i>
      </span>
      <div v-show="isEditing">
        <div class='ui form'>
          <div class='field'>
            <label>Name</label>
            <input type='text' v-model="beer.name" >
          </div>
          <div class='field'>
            <label>Description</label>
            <input type='text' v-model="beer.description" >
          </div>
          <div class='field'>
            <label>Image</label>
            <input type='text' v-model="beer.image_url" >
          </div>
          <div class='ui two button attached buttons'>
            <button class='ui basic blue button' v-on:click="hideForm">
              Close X
            </button>
          </div>
        </div>
      </div>
      <router-link
        :to="{name:'detail',params:{id:beer.id}}"
      >
        {{ beer.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
import '@/assets/styles/tailwind.css';
import '@/assets/styles/main.css';

export default {
  data() {
    return {
      isEditing: false,
    };
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
      this.$emit('deleteBeer', beer)
    },
    showForm() {
      this.isEditing = true;
    },
    hideForm() {
      this.isEditing = false;
    },
  }
};
</script>
<style scoped>
</style>
