<template>
  <div>
    <div class="flex">
      <div class="w-1/3">
        <beer-list 
          v-bind:list="beerList" 
          @chooseBeer="onChangeBeer"/>
      </div>
      <div class="w-2/3">
        <beer-details :beer="selectedBeer">Detail</beer-details>
      </div>
    </div>
  </div>
</template>

<script>
import BeerList from "@/components/BeerList";
import BeerDetails from "@/components/BeerDetail";
import axios from "axios";

export default {
  components: {
    BeerList,
    BeerDetails
  },
  props: {
    chooseBeer: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      beerList: [],
      selectedBeer: null
    };
  },
  async created() {
    try {
      const { data } = await axios.get("https://api.punkapi.com/v2/beers");
      this.beerList = data;
      console.log(this.beerList);
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    onChangeBeer(beer) {
      this.selectedBeer = beer
    }
  },
};
</script>
