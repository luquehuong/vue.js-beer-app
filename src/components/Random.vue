<template>
  <div>
    Random beers:
    {{$route.random}}
    <ul
      v-for="beer in randomBeers"
      :key="beer.id"
    >
      <li>
        {{ beer.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      randomBeers: [],
    };
  },
  async created() {
    try {
      this.randomBeers = [];
      for (var i = 1; i <= 5; i++) {
        const { data } = await axios.get("https://api.punkapi.com/v2/beers/random");
        this.randomBeers.push(data[0]);
      }
    } catch (e) {
      console.error(e)
    }
  }
};
</script>