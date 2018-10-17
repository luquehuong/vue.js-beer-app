<template>
  <div class="container w-full mx-auto">
    <table>
      <thead>
        <tr>
          <th @click="sort('image_url')">Image</th>
          <th @click="sort('name')">Name</th>
          <th @click="sort('tagline')">Tag Line</th>
          <th @click="sort('volume')">Volume / boil volume (liters)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="beer in sortedList" :key="beer.id">
          <td><img class="img" :src="beer.image_url"></td>
          <td>{{ beer.name }}</td>
          <td>{{ beer.tagline }}</td>
          <td>{{ beer.volume.value }} / {{ beer.boil_volume.value }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <label>Beers per page</label>
      <select v-model="beersPerPage">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
      <div class="flex mx-auto w-full">
        <button class="btn" :disabled="!changePage(-1)" @click="prevPage">← Previous</button> 
        <button class="btn" :disabled="!changePage(1)"  @click="nextPage">Next →</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import '@/assets/styles/tailwind.css';
export default {
  data() {
    return {
      list: [],
      currentSort:'',
      currentSortDir:'',
      params: {
        page: 1,
        per_page: 10,
      }
    };
  },
  created() {
    this.getBeerList(this.params)  
  },
  methods:{
    async getBeerList(params) {
      try {
      const { data } = await axios.get("https://api.punkapi.com/v2/beers", {
        params
      });
      this.list = data;
      } catch (e) {
        console.error(e)
      }
    },
    sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    changePage: function(dir) {
      if (dir === -1 && (this.params.page > 0)) return true;
      if (dir ===  1) return true;
    },
    prevPage: function() {
      if (this.changePage(-1)) this.params.page--;
      return this.getBeerList(this.params);
    },
    nextPage: function() {
      if (this.changePage(1)) this.params.page++;
      return this.getBeerList(this.params);
    }
  },
  computed:{
    sortedList:function() {
      return this.list.slice(0).sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
    beersPerPage: {
      get() {
        return this.params.per_page;
      },
      set(v) {
        this.params.per_page = v;
        this.params.page = 1;
      }
    },
  }
}
</script>
<style scoped>
img {
  width: 20px;
  height: 70px;
}
table {
  font-family: 'Open Sans', sans-serif;
  width: 100%;
}
table th {
  width: 25%;
  padding: 1rem;
  text-transform: uppercase;
  text-align: center;
  background: #2980b9;
  color: #FFF;
  cursor: pointer;
}
table th:hover {
  background: #2472a5;
}
table td {
  padding: 0.25rem;
  text-align: center;
  border-right: 1px solid #afc5d3;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #e5f1f9;
}
.pagination {
  margin-left: auto;
  margin-right: auto;
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  margin-top: 1rem;
}
.number {
  display: inline-block;
  padding: 4px 10px;
  color: #FFF;
  border-radius: 4px;
  background: #2980b9;
  margin: 0px 5px;
  cursor: pointer;
}
.number:hover, .number.active {
  background: #96f293;
}
input, select {
  text-align: center;
  width: 10%;
  margin-left: 0.5rem;
  min-width: 10%;
  max-width: 10%;
  max-height: 2rem;
  padding: 0.25rem;
  background-color: #e5f1f9;
  font-size: 1rem;
  border: 0.1rem #2472a5;
}
.btn {
  display: block;
  width: 150px;
  margin: 1rem 0.5rem;
  padding: 1rem 2rem;  
  color: #111;
  background: transparent;
  border: 0.1rem solid #111;
  outline: 0;
  border-radius: 0.3rem;
  
  font-weight: bold;
  line-height: 1;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
}
</style>

