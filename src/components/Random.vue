<template>
  <div class="container text-center mx-auto">
    <div class="font-semibold text-xl text-blue-dark">Random beers:</div>
    <div class="container mx-auto -px-4"
      v-for="beer in randomBeers"
      :key="beer.id"
    >
      <img class="img-random" :src="beer.image_url">
      {{ beer.name }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import '@/assets/styles/tailwind.css';
import '@/assets/styles/main.css';

export default {
  data() {
    return {
      randomBeers: [],
    };
  },
  async created() {
    try {
      this.randomBeers = [];
      for (var i = 1; i <= 6; i++) {
        const { data } = await axios.get("https://api.punkapi.com/v2/beers/random");
        this.randomBeers.push(data[0]);
      }
    } catch (e) {
      console.error(e)
    }
  }
};
</script>