<template>
  <div v-bind="RandomBeers">
    <ul
      v-for="beer in randomBeers"
      :key="beer.id"
    >
      <li>
        {{ beer }}
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
  methods: {
    RandomBeers() {
      return this.randomBeers;
    }
  },
  async created() {
    try {
      this.randomBeers = [];
      for (var i = 1; i <= 5; i++) {
        const { data } = await axios.get("https://api.punkapi.com/v2/beers/random");
        this.randomBeers.push(data.name);
      }
    } catch (e) {
      console.error(e)
    }
  }
};
</script>