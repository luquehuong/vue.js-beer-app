<template>
  <div class="container px-4 mx-auto">
    <div class="topnav">
      <div>
        <router-link class="flex float-right text-white font-semibold my-4 -px-4 mx-4"
          :to="{name:'random'}"
        >
          Random Beers
        </router-link>
      </div>
      <div class="w-1/3 flex -px-4">
        <input class="w-full" placeholder="Find your beer..." name="search" v-model="queryString" type="search"/>
      </div>
      <div>{{ searchStatus }}</div>
    </div>
    <div class="flex">
      <div class="w-1/3 sidebar">
        <create-beer v-on:create-beer="createBeer"></create-beer>
        <beer-list 
          v-on="deleteBeer"
          v-bind:list="searchResult" 
          @chooseBeer="onChangeBeer">
          <delete-beer v-on:delete-beer="deleteBeer"></delete-beer>
        </beer-list>
      </div>
      <div class="w-2/3 text-center my-12 -px-4 detail">
        <beer-details :beer="selectedBeer"></beer-details>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import BeerList from "@/components/BeerList";
import BeerDetails from "@/components/BeerDetail";
import CreateBeer from "@/components/CreateBeer";
import axios from "axios";
import sweetalert from 'sweetalert';

export default {
  components: {
    BeerList,
    BeerDetails,
    CreateBeer
  },
  props: {
    chooseBeer: {
      type: Object,
      default: () => null
    },
  },
  data() {
    return {
      beerList: [],
      selectedBeer: null,
      queryString: '',
      typing: false,
      fetching: false,
    };
  },
  watch: {
    queryString(_) {
      this.typing = true
      this.search()
    },
    $route: {
      deep: true,
      handler(val) {
        const id = val.params.id
        this.selectedBeer = this.beerList.find(b => {
          return b.id == id
        })
      }
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
      return 'Done search'
    }
  },
  async created() {
    try {
      const { data } = await axios.get("https://api.punkapi.com/v2/beers");
      this.beerList = data;
      const {id} = this.$route.params
      this.selectedBeer = beerList.find(b => {
        return b.id == id
      })
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
        this.fetching = false
        this.typing = false
      }, 500)
    }, 500),
    deleteBeer(beer) {
      this.selectedBeer = beer,
      sweetalert({
        title: 'Are you sure?',
        text: 'This beer will be permanently deleted!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!',
        closeOnConfirm: false,
      },
      () => {
        const beerIndex = this.data.indexOf(beer);
        this.data.splice(beerIndex, 1);
        sweetalert('Deleted!', 'Your beer has been deleted.', 'success');
      });
    },
    createBeer(newBeer) {
      this.beerList.push(newBeer);
      sweetalert('Success!', 'Beer created!', 'success');
    },
  },
};
</script>
