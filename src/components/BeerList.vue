<template>
  <div>
    <div
      v-for="beer in list"
      :key="beer.id"
    >
      <span @click="deleteBeer(beer)">
        <i><font-awesome-icon class="float-right" icon="trash" size="xs" /></i>
      </span>
      <span @click="editBeer(beer); openForm" v-show="!isEditing">
        <i><font-awesome-icon class="float-right" icon="edit" size="xs" /></i>
      </span>
      <div class='ui centered card' v-show="isEditing">
        <div class='ui form'>
          <div class='field'>
            <label>Name</label>
            <input v-model="name" type='text'>
          </div>
          <div class='field'>
            <label>Description</label>
            <input v-model="description" type='text'>
          </div>
          <div class='field'>
            <label>Image</label>
            <input v-model="image_url" type='text'>
          </div>
          <div class='ui two button attached buttons'>
            <button class='ui basic blue button' v-on:click="sendForm()">
              Save
            </button>
            <button class='ui basic red button' v-on:click="closeForm">
              Cancel
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
      name: "",
      description: "",
      image_url: "",
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
    openForm() {
      this.isEditing = true;
    },
    closeForm() {
      this.isEditing = false;
    },
    sendForm() {
      if (this.name.length > 0 && this.description.length > 0) {
        const name = this.name;
        const description = this.description;
        const image_url = this.image_url;
        this.$emit('editBeer', {
          name,
          description,
          image_url,
          done: false,
        });
        this.name = "";
        this.description = "";
        this.image_url = "";
        this.isCreating = false;
      }
    },
  }
};
</script>
<style scoped>
</style>
