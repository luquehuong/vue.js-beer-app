<template>
  <div>
    <div class="flex">
      <div class="w-1/3">
        <input v-model="queryString" type="search"/>
        <div>{{ searchStatus }}</div>
        <beer-list 
          v-bind:list="searchResult" 
          @chooseBeer="onChangeBeer"/>
      </div>
      <div class="w-2/3">
        <beer-details :beer="selectedBeer"></beer-details>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce"
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
      selectedBeer: null,
      queryString: '',
      typing: false,
      fetching: false
    };
  },
  watch: {
    queryString(val) {
      this.typing = true
      this.search()
    }
  },
  computed: {
    searchResult() {
      if(!this.queryString) return this.beerList
      return this.beerList.filter(b => b.name.includes(this.queryString)) 
    },
    searchStatus() {
      if(this.fetching) return 'Fetching...'
      if(this.typing) return 'Typing...'
      return 'Done'
    }
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
    },
    search: debounce(function() {
      this.fetching = true
      setTimeout(() => {
        console.log('here')
        this.fetching = false
        this.typing = false
      }, 500)
    }, 500)
  },
};
</script>
