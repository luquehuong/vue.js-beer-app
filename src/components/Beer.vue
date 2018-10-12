<template>
  <div>
    <span @click="deleteBeer(beer)">
      <i><font-awesome-icon class="float-right" icon="trash" size="xs" /></i>
    </span>
    <span @click="openForm()" v-show="!isEditing">
      <i><font-awesome-icon class="float-right" icon="edit" size="xs" /></i>
    </span>
    <div class='ui centered card' v-show="isEditing">
      <div class='ui form'>
        <div class='field'>
          <label>Name</label>
          <input v-model="beer.name" type='text'>
        </div>
        <div class='field'>
          <label>Description</label>
          <textarea rows="3" v-model="beer.description"></textarea>
        </div>
        <div class='field'>
          <label>Image</label>
          <input v-model="beer.image_url" type='text'>
        </div>
        <div class='ui two button attached buttons'>
          <button class='ui basic blue button' v-on:click="closeForm">
            Close
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
</template>
<script>
import '@/assets/styles/tailwind.css';
import '@/assets/styles/main.css';

export default {
  props: {
    beer: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      isEditing: false,
    };
  },
  methods: {
    deleteBeer(beer) {
      this.$emit('deleteBeer', beer);
    },
    openForm() {
      this.isEditing = true;
    },
    closeForm() {
      this.isEditing = false;
    }
  }
};  
</script>

