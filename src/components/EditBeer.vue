<template>
  <div class='text-center'>
    <button class='ui basic button icon' v-on:click="openForm" v-show="!isEditing">
      <font-awesome-icon class="float-left" icon="edit" size="sx" />
    </button>
    <div class='ui centered card' v-show="isEditing">
      <div>
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
    </div>
  </div>
</template>

<script>
const beerDefault = {
  name: "",
  description: "",
  image_url: "",
}
export default {
  props: {
    beer: {
      type: Object,
      default: () => ({...beerDefault})
    },
  },
  data() {
    return {
      ...beerDefault
    };
  },
  created() {
    this.data = {...this.data, ...this.beer}
  },
  methods: {
    openForm() {
      this.isCreating = true;
    },
    closeForm() {
      this.isCreating = false;
    },
    sendForm() {
      if (this.name.length > 0 && this.description.length > 0) {
        const name = this.name;
        const description = this.description;
        const image_url = this.image_url;
        this.$emit('create-beer', {
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
  },
};
</script>
